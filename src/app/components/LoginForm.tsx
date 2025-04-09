'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import Image from 'next/image';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1.5rem;
  background: white;
  overflow: hidden;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
`;

const ThemeToggle = styled.div`
  width: 60px;
  height: 30px;
  background: #E8E8E8;
  border-radius: 15px;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ToggleKnob = styled.div<{ $isDark?: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${props => props.$isDark ? '#333333' : 'white'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(${props => props.$isDark ? '30px' : '0'});
  transition: all 0.3s ease;

  svg {
    color: ${props => props.$isDark ? 'white' : '#333333'};
    font-size: 16px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  width: 200px;
  height: 60px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
  color: #000;
`;

const LightBulb = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  padding-left: 3rem;
  padding-right: ${props => props.type === 'password' ? '3rem' : '1rem'};
  background: #F5F5F5;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  color: #333;
  
  &::placeholder {
    color: #666;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VisibilityIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  background: #0088CC;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.5rem;
  width: 100%;
  
  &:hover {
    background: #006699;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 2rem 0;
  color: #666;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: calc(50% - 80px);
    height: 1px;
    background: #E8E8E8;
  }
  
  &::before { left: 0; }
  &::after { right: 0; }
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const SocialButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  color: #333;
  margin-top: auto;
  padding-bottom: 0.5rem;
  
  a {
    color: #0088CC;
    text-decoration: none;
    margin-left: 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff3333;
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const LoginForm = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      
      // Redirect to home page
      router.push('/');
    } catch (err: any) {
      console.error('Login error:', err.code);
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError('Failed to login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <TopBar>
        <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
          <ToggleKnob $isDark={isDarkMode}>
            {isDarkMode ? 
              <DarkModeOutlinedIcon sx={{ fontSize: 16 }} /> : 
              <LightModeOutlinedIcon sx={{ fontSize: 16 }} />
            }
          </ToggleKnob>
        </ThemeToggle>
      </TopBar>
      
      <Title>Tech Connect</Title>
      
      <LightBulb>
        <svg viewBox="0 0 24 24" fill="#FFD700" stroke="black" strokeWidth="1">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/>
          <path d="M9 21h6" stroke="black" strokeWidth="1" strokeLinecap="round"/>
          <path d="M9 18h6" stroke="black" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </LightBulb>
      
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <InputIcon>
            <PersonOutlineIcon />
          </InputIcon>
          <Input 
            type="email" 
            placeholder="Enter Email..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputContainer>
        
        <InputContainer>
          <InputIcon>
            <LockOutlinedIcon />
          </InputIcon>
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder="Enter Password..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <VisibilityIcon onClick={() => setShowPassword(!showPassword)}>
            <VisibilityOutlinedIcon />
          </VisibilityIcon>
        </InputContainer>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <LoginButton type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </LoginButton>
      </Form>
      
      <Divider>Or Log In With</Divider>
      
      <SocialButtons>
        <SocialButton>
          <FacebookIcon sx={{ color: '#1877F2' }} />
        </SocialButton>
        <SocialButton>
          <GoogleIcon sx={{ color: '#DB4437' }} />
        </SocialButton>
        <SocialButton>
          <AppleIcon sx={{ color: '#000000' }} />
        </SocialButton>
      </SocialButtons>
      
      <SignUpLink>
        Don't have an account?
        <Link href="/auth/signup">Sign up</Link>
      </SignUpLink>
    </Container>
  );
};

export default LoginForm; 