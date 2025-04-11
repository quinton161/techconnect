'use client';

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Bell, MapPin, Clock, Search } from "lucide-react"
import styled from "styled-components"
import BottomNav from "@/components/BottomNav"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
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

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
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
  -webkit-overflow-scrolling: touch;
  padding: 0 1rem;
  padding-bottom: 70px;
  
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

const SearchSection = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #e5e5e5;
  border-radius: 9999px;
  font-size: 0.875rem;
  outline: none;
  background: #f8f8f8;

  &::placeholder {
    color: #666;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const CategorySection = styled.div`
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CategoryScroll = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled.button<{ $active?: boolean }>`
  white-space: nowrap;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  border: none;
  background: ${props => props.$active ? '#0077b6' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#000'};
  border: 1px solid ${props => props.$active ? '#0077b6' : '#e5e5e5'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$active ? '#0077b6' : '#f0f0f0'};
  }
`;

const EventsSection = styled.div`
  margin-bottom: 1rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const ViewAllLink = styled.a`
  font-size: 0.875rem;
  color: #0077b6;
  text-decoration: none;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const EventImageWrapper = styled.div`
  width: 100%;
  height: 130px;
  position: relative;
`;

const EventInfo = styled.div`
  padding: 0.75rem;
`;

const EventTitle = styled.h3`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const EventDetail = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  color: #666;
  margin-bottom: 0.25rem;
  gap: 0.25rem;
`;

const BackButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  background: #0077b6;
  color: white;
  margin: 1.5rem 0 2rem;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #00669e;
  }
`;

export default function EventsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("UI/UX Design");

  const handleBackToHome = () => {
    router.push('/home');
  };

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'ui-ux', name: 'UI/UX Design' },
    { id: 'software', name: 'Software' },
    { id: 'digital-marketing', name: 'Digital Marketing' }
  ];
  
  const events = [
    {
      id: 'vr-update',
      title: 'VR Update Launch',
      image: '/images/vr.png',
      location: 'Zimbabwe International Trade Fair',
      time: '21-22 April 2023/ 1200-1400'
    },
    {
      id: 'design-mindset',
      title: 'Design Mindset Event',
      image: '/images/design.png',
      location: 'Online Meetup/Google Drive',
      time: '21-22 April 2023/ 1200-1600'
    }
  ];

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Link href="/community">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <Title>Events</Title>
        </HeaderLeft>
        <HeaderRight>
          <ProfileImageContainer>
            <Image
              src="/images/default-profile.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </ProfileImageContainer>
          <Bell size={24} color="#0077b6" />
        </HeaderRight>
      </Header>

      <MainContent>
        <SearchSection>
          <SearchIconWrapper>
            <Search className="h-5 w-5" />
          </SearchIconWrapper>
          <SearchInput placeholder="Discover Latest Events..." />
        </SearchSection>

        <CategorySection>
          <CategoryTitle>Category Events</CategoryTitle>
          <CategoryScroll>
            {categories.map((category) => (
              <CategoryButton 
                key={category.id}
                $active={activeCategory === category.name}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </CategoryButton>
            ))}
          </CategoryScroll>
        </CategorySection>

        <EventsSection>
          <SectionHeader>
            <CategoryTitle>UI/UX Design</CategoryTitle>
            <ViewAllLink href="#">View All</ViewAllLink>
          </SectionHeader>
          <EventsGrid>
            {events.map((event) => (
              <EventCard key={event.id} onClick={() => router.push(`/events/${event.id}`)}>
                <EventImageWrapper>
                  <Image 
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </EventImageWrapper>
                <EventInfo>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDetail>
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </EventDetail>
                  <EventDetail>
                    <Clock size={14} />
                    <span>{event.time}</span>
                  </EventDetail>
                </EventInfo>
              </EventCard>
            ))}
          </EventsGrid>
        </EventsSection>

        <BackButton onClick={handleBackToHome}>
          Back To Home Screen
        </BackButton>
      </MainContent>
      
      <BottomNav />
    </Container>
  );
} 