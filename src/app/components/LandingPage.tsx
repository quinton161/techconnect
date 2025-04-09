'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: white;
  width: 100%;
  position: relative;
  overflow-y: auto;

  @media (min-height: 800px) {
    height: 100vh;
    overflow: hidden;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 42%;
  min-height: 300px;
  position: relative;
  overflow: hidden;
  background: #f5f5f5;

  @media (max-width: 768px) {
    height: 40%;
    min-height: 280px;
  }

  @media (max-width: 480px) {
    height: 38%;
    min-height: 250px;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100% !important;
  height: 100% !important;
  transition: opacity 0.3s ease-in-out;
`;

const ContentSection = styled.div`
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  flex: 1;
  justify-content: space-between;

  @media (max-width: 480px) {
    padding: 1.25rem;
    gap: 0.75rem;
  }
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 1rem;
`;

const SlideContent = styled.div<{ $active: boolean }>`
  position: absolute;
  width: 100%;
  left: 0;
  opacity: ${props => props.$active ? 1 : 0};
  transform: translateX(${props => props.$active ? '0' : '100%'});
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  pointer-events: ${props => props.$active ? 'auto' : 'none'};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  padding: 0 0.5rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.4;
    padding: 0;
  }
`;

const DotContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.75rem 0;
  margin-top: auto;
`;

const GetStartedButton = styled.button`
  background: #0088cc;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  width: 90%;
  max-width: 300px;
  margin: 1rem auto;
  transition: background-color 0.2s;

  &:hover {
    background: #006699;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1.75rem;
    font-size: 1rem;
    width: 85%;
    margin: 0.75rem auto;
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface DotProps {
  $active?: boolean;
  onClick?: () => void;
}

const Dot = styled.div<DotProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$active ? '#0088cc' : '#ddd'};
  cursor: pointer;
  transition: background-color 0.2s;

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }
`;

const MentorshipTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.5rem;
  line-height: 1.2;

  span {
    display: block;
    margin-top: 0.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
`;

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth');
  };

  return (
    <Container>
      <ImageContainer>
        <StyledImage
          src={activeSlide === 0 ? "/images/Rectangle 2.png" : "/images/Rectangle 3.png"}
          alt={activeSlide === 0 ? "Tech professionals collaborating" : "Mentorship session"}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
          priority
        />
      </ImageContainer>
      <ContentSection>
        <SlideWrapper>
          <SlideContent $active={activeSlide === 0}>
            <Title>Tech Connect App</Title>
            <Description>
              A place where industry experts and emerging talent come together to connect, 
              share knowledge, and find the guidance needed to thrive in the ever-evolving 
              world of technology.
            </Description>
          </SlideContent>
          <SlideContent $active={activeSlide === 1}>
            <MentorshipTitle>
              Mentorship. Growth.
              <span>Connection.</span>
            </MentorshipTitle>
            <Description>
              Tech Connect empowers growth through mentorship, connecting 
              tech professionals with experienced mentors to foster development 
              and collaboration in a thriving community.
            </Description>
          </SlideContent>
        </SlideWrapper>
        <DotContainer>
          <Dot $active={activeSlide === 0} onClick={() => setActiveSlide(0)} />
          <Dot $active={activeSlide === 1} onClick={() => setActiveSlide(1)} />
        </DotContainer>
        <GetStartedButton onClick={handleGetStarted}>Get Started</GetStartedButton>
      </ContentSection>
    </Container>
  );
};

export default LandingPage; 