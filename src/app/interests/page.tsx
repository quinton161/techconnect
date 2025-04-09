"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InterestsScreen from '@/components/InterestsScreen';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function InterestsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth');
      } else {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return <InterestsScreen userId={userId} />;
} 