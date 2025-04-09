'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0088CC;
  padding: 2rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
`;

const LightBulbIcon = styled.div`
  font-size: 3rem;
  color: #FFD700;
  margin-bottom: 3rem;
  
  &::before {
    content: '💡';
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
`;

const SignUpButton = styled.button`
  background: white;
  color: #0088CC;
  border: none;
  border-radius: 25px;
  padding: 0.9rem;
  font-size: 1.1rem;
  font-weight: 500;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

const LoginButton = styled.button`
  background: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 25px;
  padding: 0.9rem;
  font-size: 1.1rem;
  font-weight: 500;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const AuthScreen = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/auth/signup');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <Container>
      <Title>Tech Connect</Title>
      <LightBulbIcon />
      <ButtonContainer>
        <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </ButtonContainer>
    </Container>
  );
};

export default AuthScreen; 