import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { WhereBuildersUnite } from './sections/WhereBuildersUnite';
import { Partners } from './sections/Partners';
import { Speakers } from './sections/Speakers';
import { Organizers } from './sections/Organizers';
import { Venue } from './sections/Venue';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
const AdminLayout = lazy(() => import('./admin/components/AdminLayout').then(m => ({ default: m.AdminLayout })));
const ProtectedRoute = lazy(() => import('./admin/components/ProtectedRoute').then(m => ({ default: m.ProtectedRoute })));
const Login = lazy(() => import('./admin/pages/Login').then(m => ({ default: m.Login })));
const Dashboard = lazy(() => import('./admin/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const HeroEditor = lazy(() => import('./admin/pages/HeroEditor').then(m => ({ default: m.HeroEditor })));
const SpeakersManager = lazy(() => import('./admin/pages/SpeakersManager').then(m => ({ default: m.SpeakersManager })));
const PartnersManager = lazy(() => import('./admin/pages/PartnersManager').then(m => ({ default: m.PartnersManager })));
const FAQManager = lazy(() => import('./admin/pages/FAQManager').then(m => ({ default: m.FAQManager })));
const OrganizersManager = lazy(() => import('./admin/pages/OrganizersManager').then(m => ({ default: m.OrganizersManager })));
const VenueEditor = lazy(() => import('./admin/pages/VenueEditor').then(m => ({ default: m.VenueEditor })));
const Settings = lazy(() => import('./admin/pages/Settings').then(m => ({ default: m.Settings })));

import { SiteDataProvider, useSiteData } from './context/SiteDataContext';

function SEOUpdater() {
  const { siteData } = useSiteData();
  
  useEffect(() => {
    // 1. Update document title
    document.title = siteData.settings.seoTitle || 'AWS Community Day Peshawar 2026';
    
    // 2. Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', siteData.settings.seoDescription || '');
    
    // 3. Update or create og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', siteData.settings.seoTitle || '');
    
    // 4. Update or create og:description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', siteData.settings.seoDescription || '');
  }, [siteData.settings.seoTitle, siteData.settings.seoDescription]);
  
  return null;
}

function App() {
  return (
    <SiteDataProvider>
      <SEOUpdater />
      <BrowserRouter>
        <Routes>
        {/* Public Site */}
        <Route path="/" element={
          <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
            <div className="min-h-screen bg-background font-body text-textPrimary">
              <Navbar />
              <main>
                <Hero />
                <WhereBuildersUnite />
                <Partners />
                <Speakers />
                <Organizers />
                <Venue />
                <FAQ />
              </main>
              <Footer />
            </div>
          </ReactLenis>
        } />
        
        {/* Admin */}
        <Route path="/admin/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
        <Route path="/admin" element={<Suspense fallback={<div>Loading...</div>}><ProtectedRoute><AdminLayout /></ProtectedRoute></Suspense>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hero" element={<HeroEditor />} />
          <Route path="speakers" element={<SpeakersManager />} />
          <Route path="partners" element={<PartnersManager />} />
          <Route path="faq" element={<FAQManager />} />
          <Route path="organizers" element={<OrganizersManager />} />
          <Route path="venue" element={<VenueEditor />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </SiteDataProvider>
  );
}

export default App;
