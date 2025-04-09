'use client';

import styled from 'styled-components';

const SplashContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #0088cc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const LightBulbIcon = styled.img`
  width: 40px;
  height: 40px;
  animation: glow 2s infinite;

  @keyframes glow {
    0% { opacity: 0.8; transform: scale(0.95); }
    50% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 0.8; transform: scale(0.95); }
  }
`;

const SplashScreen = () => {
  return (
    <SplashContainer>
      <Title>Tech Connect</Title>
      <LightBulbIcon src="/lightbulb.svg" alt="Light Bulb" />
    </SplashContainer>
  );
};

export default SplashScreen; 