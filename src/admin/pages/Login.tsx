import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeoCard } from '../../components/NeoCard';
import { NeoInput } from '../../components/NeoInput';
import { NeoButton } from '../../components/NeoButton';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { KeyRound, ExternalLink, ShieldCheck, Loader2 } from 'lucide-react';
import { DEFAULT_REPO_CONFIG } from '../services/github';

function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function Login() {
  const [token, setToken] = useState('');
  const [repoOwner, setRepoOwner] = useState(DEFAULT_REPO_CONFIG.owner);
  const [repoName, setRepoName] = useState(DEFAULT_REPO_CONFIG.repo);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginWithGitHubToken } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await loginWithGitHubToken(token, repoOwner, repoName);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Title */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary border-[3px] border-black shadow-neo-sm font-heading text-xs font-black uppercase mb-3">
          <ShieldCheck size={16} /> Secure Admin Access
        </div>
        <h1 className="font-heading text-3xl md:text-5xl font-black mb-1 uppercase">
          AWS Student Community Day
        </h1>
        <p className="font-bold text-lg md:text-xl tracking-widest text-textSecondary uppercase">
          GitHub Authenticated CMS
        </p>
      </div>

      <NeoCard className="w-full max-w-lg bg-white p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b-[3px] border-black mb-6">
          <div className="p-3 bg-black text-white border-[3px] border-black shadow-neo-sm">
            <GitHubIcon size={24} />
          </div>
          <div>
            <h2 className="font-heading font-black text-xl uppercase">Sign In with GitHub</h2>
            <p className="text-xs font-bold text-gray-600">
              Only repository collaborators with push permissions can sign in.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <NeoInput
              label="GitHub Personal Access Token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              required
              disabled={isLoading}
            />
            <p className="text-[11px] font-bold text-gray-500 mt-2 flex items-center gap-1">
              <KeyRound size={14} /> Needs <code className="bg-gray-100 px-1 border border-black text-black">repo</code> scope to publish content directly.
            </p>
          </div>

          {/* Quick link to GitHub token generation */}
          <div className="p-3 bg-secondary/30 border-[3px] border-black text-xs font-bold flex items-center justify-between">
            <span>Don&apos;t have a token?</span>
            <a
              href="https://github.com/settings/tokens/new?scopes=repo&description=AWS+SCD+CMS+Admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-black underline uppercase hover:text-primary transition-colors"
            >
              Generate on GitHub <ExternalLink size={12} />
            </a>
          </div>

          {/* Advanced toggle for custom repository */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-bold uppercase text-gray-600 hover:text-black underline"
            >
              {showAdvanced ? 'Hide Repository Settings' : 'Custom Repository Settings'}
            </button>

            {showAdvanced && (
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t-[2px] border-dashed border-black">
                <NeoInput
                  label="Repo Owner"
                  value={repoOwner}
                  onChange={(e) => setRepoOwner(e.target.value)}
                  placeholder="awssbgfastpwr"
                />
                <NeoInput
                  label="Repo Name"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="scd2026"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-100 border-[3px] border-black shadow-neo-sm text-red-700 font-bold text-xs uppercase">
              {error}
            </div>
          )}

          <NeoButton
            type="submit"
            variant="primary"
            disabled={isLoading || !token.trim()}
            className="w-full justify-center flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Verifying GitHub Access...</span>
              </>
            ) : (
              <>
                <GitHubIcon size={18} />
                <span>Authenticate with GitHub</span>
              </>
            )}
          </NeoButton>
        </form>
      </NeoCard>
    </div>
  );
}
