export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  html_url: string;
}

export interface RepoConfig {
  owner: string;
  repo: string;
  branch: string;
}

export const DEFAULT_REPO_CONFIG: RepoConfig = {
  owner: 'awssbgfastpwr',
  repo: 'scd2026',
  branch: 'main',
};

/**
 * Verify GitHub token and fetch authenticated user profile.
 */
export async function verifyGitHubToken(token: string): Promise<GitHubUser> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid GitHub token. Please check your token and try again.');
    }
    throw new Error(`GitHub verification failed: ${response.statusText}`);
  }

  const user: GitHubUser = await response.json();
  return user;
}

/**
 * Check if the user has write/admin push access to the target repository.
 */
export async function checkRepoPermissions(
  token: string,
  owner: string,
  repo: string
): Promise<{ canPush: boolean; message?: string }> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (response.status === 404) {
      // Repository not created yet or private without access
      return {
        canPush: true,
        message: `Repository ${owner}/${repo} not found or still being initialized. Proceeding with user access.`,
      };
    }

    if (!response.ok) {
      return {
        canPush: false,
        message: `Unable to access repository ${owner}/${repo} (${response.statusText}).`,
      };
    }

    const data = await response.json();
    const permissions = data.permissions;

    if (permissions && (permissions.push || permissions.admin)) {
      return { canPush: true };
    }

    return {
      canPush: false,
      message: `User does not have write/push access to ${owner}/${repo}.`,
    };
  } catch (err: any) {
    return {
      canPush: true,
      message: err.message,
    };
  }
}

/**
 * Commit updated siteData.ts directly to the GitHub repository.
 */
export async function commitSiteDataToGitHub(
  token: string,
  fileContent: string,
  commitMessage: string = 'chore(cms): update site content from admin panel',
  config: RepoConfig = DEFAULT_REPO_CONFIG
): Promise<{ success: boolean; sha?: string; message?: string }> {
  const filePath = 'src/data/siteData.ts';
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;

  // 1. Get current file sha (needed for update)
  let currentSha: string | undefined;
  try {
    const getRes = await fetch(`${url}?ref=${config.branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (getRes.ok) {
      const getData = await getRes.json();
      currentSha = getData.sha;
    }
  } catch {
    // If not found, will create new file
  }

  // 2. Base64 encode content
  const encodedContent = btoa(unescape(encodeURIComponent(fileContent)));

  // 3. Put request to create or update file
  const putRes = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: commitMessage,
      content: encodedContent,
      branch: config.branch,
      sha: currentSha,
    }),
  });

  if (!putRes.ok) {
    const errorData = await putRes.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to commit changes: ${putRes.statusText}`);
  }

  const result = await putRes.json();
  return { success: true, sha: result.commit?.sha };
}
