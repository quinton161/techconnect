'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const glow = keyframes`
  0% { opacity: 0.8; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.8; transform: scale(0.95); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const SplashContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #0088cc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${fadeIn} 0.5s ease-in-out;
  z-index: 1000;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  text-align: center;
  margin: 0;
  animation: ${pulse} 2s infinite;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Tagline = styled.p`
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  margin: 0;
  opacity: 0.9;
  animation: ${fadeIn} 1s ease-in-out;
`;

const LightBulbIcon = styled.img`
  width: 60px;
  height: 60px;
  animation: ${glow} 2s infinite;
`;

const SplashScreen = () => {
  return (
    <SplashContainer>
      <LightBulbIcon src="/lightbulb.svg" alt="Light Bulb" />
      <Title>Tech Connect</Title>
      <Tagline>Connecting Minds, Building Futures</Tagline>
    </SplashContainer>
  );
};

export default SplashScreen; 