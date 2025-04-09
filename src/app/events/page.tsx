'use client';

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Bell, MapPin, Clock, Search } from "lucide-react"
import styled from "styled-components"
import BottomNav from "@/components/BottomNav"

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 0;
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
  font-size: 1.5rem;
  font-weight: bold;
  color: #0088CC;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 1rem;
  
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
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
  background: ${props => props.$active ? '#0088CC' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#000'};
  border: 1px solid ${props => props.$active ? '#0088CC' : '#e5e5e5'};
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
  color: #0088CC;
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
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  background: #0088CC;
  color: white;
  margin: 1.5rem 0 5rem;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function EventsPage() {
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
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#0088CC]">
            <Image
              src="/images/Rectangle 2.png"
              alt="Profile"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <Bell className="h-6 w-6 text-[#0088CC]" />
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
            <CategoryButton>All</CategoryButton>
            <CategoryButton $active>UI/UX Design</CategoryButton>
            <CategoryButton>Software</CategoryButton>
            <CategoryButton>Digital Marketing</CategoryButton>
          </CategoryScroll>
        </CategorySection>

        <EventsSection>
          <SectionHeader>
            <CategoryTitle>UI/UX Design</CategoryTitle>
            <ViewAllLink href="#">View All</ViewAllLink>
          </SectionHeader>
          <EventsGrid>
            <EventCard>
              <EventImageWrapper>
                <Image 
                  src="/images/vr.png"
                  alt="VR Update Launch"
                  fill
                  className="object-cover"
                />
              </EventImageWrapper>
              <EventInfo>
                <EventTitle>VR Update Launch</EventTitle>
                <EventDetail>
                  <MapPin className="h-3 w-3" />
                  Zimbabwe International Trade Fair
                </EventDetail>
                <EventDetail>
                  <Clock className="h-3 w-3" />
                  21-22 April 2025 / 1200-1400
                </EventDetail>
              </EventInfo>
            </EventCard>

            <EventCard>
              <EventImageWrapper>
                <div className="absolute top-2 left-2 bg-[#F2F2F2] rounded-full p-1">
                  <Image 
                    src="/images/Ellipse 12.png"
                    alt="Imaginary"
                    width={18}
                    height={18}
                  />
                </div>
                <Image 
                  src="/images/design.png"
                  alt="Design Mindset Event"
                  fill
                  className="object-cover"
                />
              </EventImageWrapper>
              <EventInfo>
                <EventTitle>Design Mindset Event</EventTitle>
                <EventDetail>
                  <MapPin className="h-3 w-3" />
                  Online Meetup/Google Drive
                </EventDetail>
                <EventDetail>
                  <Clock className="h-3 w-3" />
                  21-22 April 2025 / 1200-1600
                </EventDetail>
              </EventInfo>
            </EventCard>
          </EventsGrid>
        </EventsSection>

        <BackButton onClick={() => window.location.href = "/"}>
          Back To Home Screen
        </BackButton>
      </MainContent>

      <BottomNav />
    </Container>
  );
} 