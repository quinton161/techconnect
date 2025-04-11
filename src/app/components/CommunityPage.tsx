'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  background: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const HeaderTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  color: #0077b6;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImageContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 70px;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 119, 182, 0.3);
    border-radius: 3px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 1rem;
  color: #333;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0 1rem;
`;

const FeatureCard = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  height: 200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const FeatureImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const FeatureTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  font-weight: 600;
  text-align: center;
`;

const BackButton = styled.button`
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 1rem;
  margin: 1.5rem 1rem;
  width: calc(100% - 2rem);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #00669e;
  }
`;

export default function CommunityPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.push('/auth');
          return;
        }

        // Get additional user data from Firestore if available
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          setUserData({
            ...userDoc.data(),
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || userDoc.data().displayName || user.email?.split('@')[0]
          });
        } else {
          // If no document exists, just use the auth data
          setUserData({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0]
          });
        }
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [router]);

  // Community features data
  const features = [
    {
      id: 1,
      title: 'Event Listing',
      image: '/images/community1.png',
      route: '/events'
    },
    {
      id: 2,
      title: 'Mentorship',
      image: '/images/community2.png',
      route: '/mentorship'
    },
    {
      id: 3,
      title: 'Project Colloboration',
      image: '/images/community3.png',
      route: '/projects'
    },
    {
      id: 4,
      title: 'Job Board',
      image: '/images/community4.png',
      route: '/jobs'
    }
  ];

  const handleBackToHome = () => {
    router.push('/home');
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Community</HeaderTitle>
        <HeaderRight>
          <ProfileImageContainer>
            <Image 
              src={userData?.profileImage || "/images/default-profile.jpg"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </ProfileImageContainer>
          <Link href="/notifications">
            <Bell size={24} color="#0077b6" />
          </Link>
        </HeaderRight>
      </Header>
      
      <MainContent>
        <SectionTitle>Explore The Best Of Our Community</SectionTitle>
        
        <FeaturesGrid>
          {features.map(feature => (
            <FeatureCard key={feature.id} onClick={() => router.push(feature.route)}>
              <FeatureImage>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </FeatureImage>
              <FeatureTitle>{feature.title}</FeatureTitle>
            </FeatureCard>
          ))}
        </FeaturesGrid>
        
        <BackButton onClick={handleBackToHome}>
          Back To Home Screen
        </BackButton>
      </MainContent>
      
      <BottomNav />
    </Container>
  );
}