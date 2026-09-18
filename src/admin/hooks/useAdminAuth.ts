import { useState, useCallback } from 'react';
import { verifyGitHubToken, checkRepoPermissions, type GitHubUser, DEFAULT_REPO_CONFIG } from '../services/github';

const TOKEN_KEY = 'admin_gh_token';
const USER_KEY = 'admin_gh_user';

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState<GitHubUser | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(token && user);

  const loginWithGitHubToken = useCallback(
    async (
      inputToken: string,
      repoOwner: string = DEFAULT_REPO_CONFIG.owner,
      repoName: string = DEFAULT_REPO_CONFIG.repo
    ): Promise<{ success: boolean; error?: string }> => {
      const cleanToken = inputToken.trim();
      if (!cleanToken) {
        return { success: false, error: 'Please enter a GitHub Personal Access Token.' };
      }

      try {
        // 1. Verify token with GitHub API
        const ghUser = await verifyGitHubToken(cleanToken);

        // 2. Check repo write access
        const permCheck = await checkRepoPermissions(cleanToken, repoOwner, repoName);
        if (!permCheck.canPush) {
          return {
            success: false,
            error: permCheck.message || 'You do not have write permissions to this repository.',
          };
        }

        // 3. Store credentials securely in localStorage
        localStorage.setItem(TOKEN_KEY, cleanToken);
        localStorage.setItem(USER_KEY, JSON.stringify(ghUser));
        setToken(cleanToken);
        setUser(ghUser);

        return { success: true };
      } catch (err: any) {
        return {
          success: false,
          error: err.message || 'GitHub authentication failed. Please check token permissions.',
        };
      }
    },
    []
  );

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
      const base = import.meta.env.BASE_URL.replace(/\/$/, '');
      window.location.href = `${base}/admin/login`;
    } catch {
      // silent fail
    }
  }, []);

  return {
    isAuthenticated,
    token,
    user,
    loginWithGitHubToken,
    logout,
  };
}
