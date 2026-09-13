import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => setIsVerifying(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 border-[3px] border-black shadow-neo">
          <p className="font-heading font-black text-xl uppercase animate-pulse">Verifying Access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
