'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SplashScreen from './SplashScreen';
import LandingPage from './LandingPage';
import HomeScreen from './HomeScreen';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';

const MainContent = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PhoneApp = () => {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Handle navigation based on auth state
      if (currentUser) {
        // If user is logged in and on auth pages, redirect to home
        if (pathname?.includes('/auth') || pathname === '/') {
          router.push('/home');
        }
      } else {
        // If user is not logged in and not on auth pages, redirect to auth
        if (!pathname?.includes('/auth')) {
          router.push('/auth');
        }
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [pathname, router]);

  if (!mounted || loading) {
    return <SplashScreen />;
  }

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <MainContent>
      {user ? (
        <HomeScreen />
      ) : (
        <LandingPage />
      )}
    </MainContent>
  );
};

export default PhoneApp;
