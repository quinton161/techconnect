'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: white;
  padding: 0;
  overflow: hidden;
`;

const SlidesContainer = styled.div<{ activeSlide: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 200%;
  height: 100%;
  transform: translateX(${props => props.activeSlide * -50}%);
`;

const Slide = styled.div`
  width: 50%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
  margin-bottom: 1.5rem;
`;

const ContentContainer = styled.div`
  padding: 0 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const MentorshipTitle = styled.h1`
  color: #333;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  line-height: 1.3;
`;

const Description = styled.p`
  color: #666;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const Button = styled.button`
  background: #0088CC;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #0077b3;
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Dot = styled.div<{ active: boolean }>`
  width: ${props => props.active ? "1.5rem" : "0.5rem"};
  height: 0.5rem;
  border-radius: 25px;
  background-color: ${(props) => (props.active ? '#0088CC' : '#E0E0E0')};
  cursor: pointer;
  transition: all 0.3s;
`;

const BottomDivider = styled.div`
  height: 4px;
  background-color: #111;
  width: 50px;
  margin-top: 3rem;
  align-self: center;
`;

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();
  
  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };
  
  const handleGetStarted = () => {
    onComplete();
  };

  return (
    <Container>
      <SlidesContainer activeSlide={activeSlide}>
        {/* First slide */}
        <Slide>
          <ImageContainer>
            <img 
              src="/images/pexels-fauxels-3184360.jpg" 
              alt="Tech Connect collaboration" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </ImageContainer>
          <ContentContainer>
            <Title>Tech Connect App</Title>
            <Description>
              A place where industry experts and emerging talent come together to connect, 
              share knowledge, and find the guidance needed to thrive in the ever-evolving 
              world of technology.
            </Description>
            <DotContainer>
              <Dot active={activeSlide === 0} onClick={() => handleDotClick(0)} />
              <Dot active={activeSlide === 1} onClick={() => handleDotClick(1)} />
            </DotContainer>
            <Button onClick={handleGetStarted}>Get Started</Button>
            <BottomDivider />
          </ContentContainer>
        </Slide>
        
        {/* Mentorship slide */}
        <Slide>
          <ImageContainer>
            <img 
              src="/images/pexels-katerina-holmes-5905483.jpg" 
              alt="Mentorship connection" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </ImageContainer>
          <ContentContainer>
            <MentorshipTitle>Mentorship. Growth. Connection.</MentorshipTitle>
            <Description>
              Tech Connect empowers growth through mentorship, connecting
              tech professionals with experienced mentors to foster development
              and collaboration in a thriving community.
            </Description>
            <DotContainer>
              <Dot active={activeSlide === 0} onClick={() => handleDotClick(0)} />
              <Dot active={activeSlide === 1} onClick={() => handleDotClick(1)} />
            </DotContainer>
            <Button onClick={handleGetStarted}>Get Started</Button>
            <BottomDivider />
          </ContentContainer>
        </Slide>
      </SlidesContainer>
    </Container>
  );
};

export default WelcomeScreen; 