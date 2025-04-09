'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import AppShortcutOutlinedIcon from '@mui/icons-material/AppShortcutOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0.75rem;
  background: white;
  overflow: hidden;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const ThemeToggle = styled.div`
  width: 48px;
  height: 24px;
  background: #E8E8E8;
  border-radius: 12px;
  padding: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ToggleKnob = styled.div<{ $isDark?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.$isDark ? '#333333' : 'white'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(${props => props.$isDark ? '24px' : '0'});
  transition: all 0.3s ease;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.25rem;
  color: #000;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 0.75rem;
  font-size: 0.8125rem;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.3;
`;

const LocationInput = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 0.75rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem;
  padding-left: 2rem;
  padding-right: 2rem;
  background: #F5F5F5;
  border: none;
  border-radius: 10px;
  font-size: 0.8125rem;
  color: #333;
  cursor: pointer;
  height: 36px;
  
  &::placeholder {
    color: #666;
  }
`;

const LocationIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
`;

const ArrowIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
`;

const CategorySection = styled.div`
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: 0.9375rem;
  font-weight: 500;
  margin-bottom: 0.375rem;
  color: #333;
`;

const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.375rem;
`;

const CategoryButton = styled.button<{ $selected?: boolean }>`
  background: ${props => props.$selected ? '#0088CC' : 'white'};
  color: ${props => props.$selected ? 'white' : '#333'};
  border: 1px solid ${props => props.$selected ? '#0088CC' : '#E8E8E8'};
  border-radius: 14px;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
  height: 28px;
  
  svg {
    font-size: 14px;
  }
  
  &:hover {
    background: ${props => props.$selected ? '#006699' : '#F5F5F5'};
  }
`;

const CheckmarkIcon = styled.div<{ $visible: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -0.125rem;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.2s ease;

  svg {
    font-size: 10px;
    color: #0088CC;
  }
`;

const GetStartedButton = styled.button`
  background: #0088CC;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  margin: auto auto 0.375rem;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #006699;
  }
`;

const InterestsForm = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [location, setLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();

  const popularCategories = [
    { name: 'Software Dev.', icon: <CodeOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'Data Science', icon: <StorageOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'Web Developer', icon: <WebOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'Cyber-Security', icon: <SecurityOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'UX/UI Design', icon: <BrushOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'Systems Admin', icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 14 }} /> }
  ];

  const featuredCategories = [
    { name: 'Digital Marketing', icon: <CampaignOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'AI Research', icon: <PsychologyOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'Game Developer', icon: <SportsEsportsOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'AI Engineering', icon: <SmartToyOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'Graphic Design', icon: <DesignServicesOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'App Dev', icon: <AppShortcutOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'Logo Design', icon: <DrawOutlinedIcon sx={{ fontSize: 14 }} /> },
    { name: 'Back-end dev', icon: <DnsOutlinedIcon sx={{ fontSize: 14 }} /> }
  ];

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleGetStarted = () => {
    // Here you would typically save the user's interests
    // For now, we'll just console.log them
    console.log('Selected categories:', selectedCategories);
    console.log('Location:', location);
    // Navigate to the home screen
    router.push('/home');
  };

  return (
    <Container>
      <TopBar>
        <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
          <ToggleKnob $isDark={isDarkMode}>
            {isDarkMode ? 
              <DarkModeOutlinedIcon sx={{ fontSize: 14 }} /> : 
              <LightModeOutlinedIcon sx={{ fontSize: 14 }} />
            }
          </ToggleKnob>
        </ThemeToggle>
      </TopBar>

      <Title>Interests</Title>
      <Subtitle>
        Enter your tech passions so you can get the most of our app
      </Subtitle>

      <LocationInput>
        <LocationIcon>
          <LocationOnOutlinedIcon sx={{ fontSize: 20 }} />
        </LocationIcon>
        <Input 
          type="text" 
          placeholder="Enter Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <ArrowIcon>
          <KeyboardArrowDownIcon sx={{ fontSize: 24 }} />
        </ArrowIcon>
      </LocationInput>

      <CategorySection>
        <SectionTitle>Popular Categories</SectionTitle>
        <CategoryGrid>
          {popularCategories.map(category => (
            <CategoryButton
              key={category.name}
              $selected={selectedCategories.includes(category.name)}
              onClick={() => toggleCategory(category.name)}
            >
              {selectedCategories.includes(category.name) && (
                <CheckmarkIcon $visible={true}>
                  <CheckIcon />
                </CheckmarkIcon>
              )}
              {category.icon}
              {category.name}
            </CategoryButton>
          ))}
        </CategoryGrid>
      </CategorySection>

      <CategorySection>
        <SectionTitle>Featured Categories</SectionTitle>
        <CategoryGrid>
          {featuredCategories.map(category => (
            <CategoryButton
              key={category.name}
              $selected={selectedCategories.includes(category.name)}
              onClick={() => toggleCategory(category.name)}
            >
              {selectedCategories.includes(category.name) && (
                <CheckmarkIcon $visible={true}>
                  <CheckIcon />
                </CheckmarkIcon>
              )}
              {category.icon}
              {category.name}
            </CategoryButton>
          ))}
        </CategoryGrid>
      </CategorySection>

      <GetStartedButton onClick={handleGetStarted}>
        Get Started
      </GetStartedButton>
    </Container>
  );
};

export default InterestsForm; 