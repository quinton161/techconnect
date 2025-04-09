'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { User, Users, MessageSquare, Heart } from 'lucide-react';
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

const Header = styled.header`
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 10;
  
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0088CC;
  }
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 70px;
  
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

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
`;

const CommunityCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: transform 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const CardStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #666;
  
  div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

export default function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const communitiesRef = collection(db, 'communities');
          const q = query(communitiesRef, where('members', 'array-contains', user.uid));
          const querySnapshot = await getDocs(q);
          
          const communitiesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          setCommunities(communitiesData);
        }
      } catch (error) {
        console.error('Error fetching communities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <Container>
      <Header>
        <h1>Communities</h1>
      </Header>
      
      <MainContent>
        <CommunityGrid>
          {communities.map((community: any) => (
            <CommunityCard key={community.id}>
              <CardHeader>
                <Users size={20} color="#0088CC" />
                <h3>{community.name}</h3>
              </CardHeader>
              <CardStats>
                <div>
                  <User size={16} />
                  <span>{community.memberCount || 0}</span>
                </div>
                <div>
                  <MessageSquare size={16} />
                  <span>{community.postCount || 0}</span>
                </div>
                <div>
                  <Heart size={16} />
                  <span>{community.likeCount || 0}</span>
                </div>
              </CardStats>
            </CommunityCard>
          ))}
        </CommunityGrid>
      </MainContent>
      
      <BottomNav />
    </Container>
  );
}