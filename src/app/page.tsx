'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { auth } from '@/lib/firebase';
import WelcomeScreen from './components/WelcomeScreen';
import SplashScreen from './components/SplashScreen';

const PhoneApp = dynamic(() => import('./components/PhoneApp'), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      
      // Check if user has visited before
      let hasVisited;
      try {
        hasVisited = localStorage.getItem('hasVisitedBefore');
      } catch (error) {
        console.error('Local storage access error:', error);
        hasVisited = null;
      }
      
      if (!hasVisited) {
        setShowWelcome(true);
        return;
      }
      
      // Check if user is logged in
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, go to home
          router.push('/home');
        } else {
          // No user is signed in, redirect to auth
          router.push('/auth');
        }
      });
      
      return () => unsubscribe();
    }, 2500);
    
    return () => clearTimeout(splashTimer);
  }, [router]);

  const handleCompleteWelcome = () => {
    try {
      localStorage.setItem('hasVisitedBefore', 'true');
    } catch (error) {
      console.error('Local storage write error:', error);
    }
    
    setShowWelcome(false);
    router.push('/auth');
  };

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen />;
  }

  // Show loading state until we know whether to show welcome or not
  if (showWelcome === null) {
    return <div>Loading...</div>;
  }

  // Show welcome screen for first-time visitors
  if (showWelcome) {
    return <WelcomeScreen onComplete={handleCompleteWelcome} />;
  }
  
  // Otherwise show the app
  return <PhoneApp />;
}
