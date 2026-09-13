import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { defaultSiteData, type SiteData } from '../data/siteData';

function deepMerge<T extends object>(defaults: T, override: Partial<T>): T {
  const result = { ...defaults } as any;
  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
        result[key] = deepMerge(
          (defaults[key] as any) || {},
          override[key] as any
        );
      } else if (override[key] !== undefined) {
        result[key] = override[key];
      }
    }
  }
  return result as T;
}

const STORAGE_KEY = 'site_data_override';

interface SiteDataContextType {
  siteData: SiteData;
  updateSiteData: (updates: Partial<SiteData>) => void;
  resetToDefaults: () => void;
  isOverride: boolean;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isOverride, setIsOverride] = useState(false);

  // On mount: load from localStorage if exists
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<SiteData>;
        const merged = deepMerge(defaultSiteData, parsed);
        setSiteData(merged);
        setIsOverride(true);
      }
    } catch (e) {
      console.warn('Failed to load site data from localStorage:', e);
    }
  }, []);

  const updateSiteData = useCallback((updates: Partial<SiteData>) => {
    setSiteData(prev => {
      const merged = deepMerge(prev, updates);
      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        setIsOverride(true);
      } catch (e) {
        console.warn('Failed to save site data to localStorage:', e);
      }
      return merged;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setSiteData(defaultSiteData);
    setIsOverride(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear site data from localStorage:', e);
    }
  }, []);

  return (
    <SiteDataContext.Provider value={{ siteData, updateSiteData, resetToDefaults, isOverride }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
