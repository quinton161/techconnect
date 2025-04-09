'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { LogOut, Settings, User, Mail, Phone, MapPin, Briefcase, AlertCircle } from 'lucide-react';
import BottomNav from './BottomNav';

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

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(70px + 4rem); // Account for BottomNav and LogoutButton
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #0088CC;
    border-radius: 3px;
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, #0088CC, #005580);
  color: white;
  padding: 2rem 1.5rem;
  text-align: center;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background: white;
  margin: 0 auto 1rem;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Role = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
`;

const Section = styled.section`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  color: #333;
  
  svg {
    color: #0088CC;
  }
`;

const BottomSection = styled.div`
  position: fixed;
  bottom: 70px; // Space for BottomNav
  left: 0;
  right: 0;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  background: white;
  border-top: 1px solid #eee;
  z-index: 10;
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #0088CC;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: #dc3545;
  
  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 1rem;
  }
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #0088CC;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #006699;
  }
`;

export default function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }
      
      // Create user document if it doesn't exist
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create a basic user document
        const basicUserData = {
          email: user.email,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        // We'll use the auth user data for now
        setUserData({
          ...basicUserData,
          email: user.email,
          uid: user.uid
        });
      } else {
        setUserData({
          ...userDoc.data(),
          email: user.email,
          uid: user.uid
        });
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      if (error.code === 'permission-denied') {
        setError('You don\'t have permission to access this data. Please contact support.');
      } else {
        setError('An error occurred while loading your profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner" />
        </LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <MainContent>
          <ErrorMessage>
            <AlertCircle />
            <h3>Error Loading Profile</h3>
            <p>{error}</p>
            <RetryButton onClick={fetchUserData}>Try Again</RetryButton>
          </ErrorMessage>
        </MainContent>
        
        <BottomSection>
          <LogoutButton onClick={handleLogout}>
            <LogOut />
            Log Out
          </LogoutButton>
        </BottomSection>
        
        <BottomNav />
      </Container>
    );
  }

  return (
    <Container>
      <MainContent>
        <Header>
          <ProfileImage>
            <img 
              src={userData?.profileImage || '/images/profile-pic.png'} 
              alt="Profile" 
            />
          </ProfileImage>
          <Name>{userData?.fullName || userData?.email?.split('@')[0] || 'User'}</Name>
          <Role>{userData?.role || 'Tech Connect Member'}</Role>
        </Header>

        <Section>
          <InfoItem>
            <User size={20} />
            <span>{userData?.fullName || 'Not set'}</span>
          </InfoItem>
          <InfoItem>
            <Mail size={20} />
            <span>{userData?.email}</span>
          </InfoItem>
          <InfoItem>
            <Phone size={20} />
            <span>{userData?.phone || 'Not set'}</span>
          </InfoItem>
          <InfoItem>
            <MapPin size={20} />
            <span>{userData?.location || 'Not set'}</span>
          </InfoItem>
          <InfoItem>
            <Briefcase size={20} />
            <span>{userData?.company || 'Not set'}</span>
          </InfoItem>
        </Section>
      </MainContent>
      
      <BottomSection>
        <LogoutButton onClick={handleLogout}>
          <LogOut />
          Log Out
        </LogoutButton>
      </BottomSection>
      
      <BottomNav />
    </Container>
  );
} 