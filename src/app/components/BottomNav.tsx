'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styled from 'styled-components';
import { Home, Search, MessageSquare, User } from 'lucide-react';
import Image from 'next/image';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  background: white;
  border-top: 1px solid #e5e5e5;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 50;
`;

const NavButton = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  color: ${props => props.$active ? '#0088CC' : '#666'};
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    color: #0088CC;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$active ? '4px' : '0'};
    height: 4px;
    border-radius: 2px;
    background: #0088CC;
    transition: width 0.2s;
  }
`;

const NavLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
`;

const CreateButton = styled(NavButton)`
  transform: translateY(-1rem);
  background: #000000;
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

  &:hover {
    color: white;
    transform: translateY(-1.125rem);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const AiIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname || '/');

  const handleNavigation = (path: string) => {
    setActiveTab(path);
    router.push(path);
  };

  return (
    <NavContainer>
      <NavButton 
        $active={activeTab === '/'} 
        onClick={() => handleNavigation('/')}
        title="Home"
      >
        <Home size={24} />
        <NavLabel>Home</NavLabel>
      </NavButton>
      
      <NavButton 
        $active={activeTab === '/search'} 
        onClick={() => handleNavigation('/search')}
        title="Search"
      >
        <Search size={24} />
        <NavLabel>Search</NavLabel>
      </NavButton>
      
      <CreateButton 
        onClick={() => handleNavigation('/create')}
        title="Create Post"
      >
        <AiIconWrapper>
          <Image 
            src="/images/Ai.svg" 
            alt="AI" 
            width={24} 
            height={24} 
            className="invert brightness-0" 
          />
        </AiIconWrapper>
      </CreateButton>
      
      <NavButton 
        $active={activeTab === '/messages'} 
        onClick={() => handleNavigation('/messages')}
        title="Messages"
      >
        <MessageSquare size={24} />
        <NavLabel>Messages</NavLabel>
      </NavButton>
      
      <NavButton 
        $active={activeTab === '/profile'} 
        onClick={() => handleNavigation('/profile')}
        title="Profile"
      >
        <User size={24} />
        <NavLabel>Profile</NavLabel>
      </NavButton>
    </NavContainer>
  );
} 