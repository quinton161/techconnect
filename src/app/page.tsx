'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { auth } from '@/lib/firebase';

const PhoneApp = dynamic(() => import('./components/PhoneApp'), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, stay on home
        router.push('/');
      } else {
        // No user is signed in, redirect to auth
        router.push('/auth');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <PhoneApp />;
}
