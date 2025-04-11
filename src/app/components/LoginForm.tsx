'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { Eye, EyeOff, Mail, Lock, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  background-color: #e6e6e6;
  width: fit-content;
  padding: 4px;
  border-radius: 20px;
  margin-bottom: 1.5rem;
`;

const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #000;
  color: white;
  cursor: pointer;
`;

const AppTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  color: #0088CC;
`;

const LightBulbContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 3rem;
  background-color: #e6e6e6;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 136, 204, 0.1);
  }
  
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

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #0088CC;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: #0088CC;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.25rem;
  
  &:hover {
    background: #006699;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.25rem 0;
  
  &:before, &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e0e0e0;
  }
  
  span {
    margin: 0 10px;
    color: #666;
    font-size: 0.9rem;
  }
`;

const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
`;

const SocialButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  }
  
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #333;
  
  a {
    color: #0088CC;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BottomDivider = styled.div`
  height: 4px;
  background-color: #111;
  width: 50px;
  margin: 1.5rem auto 0;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      await signInWithEmailAndPassword(auth, email, password);
      
      router.push('/home');
    } catch (err: any) {
      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed login attempts. Please try again later.');
          break;
        default:
          setError('Failed to log in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // This would be implemented with Firebase social auth
    console.log(`Login with ${provider}`);
  };

  return (
    <Container>
      <ThemeToggle>
        <ToggleButton>
          <Sun size={16} />
        </ToggleButton>
      </ThemeToggle>
      
      <AppTitle>Tech Connect</AppTitle>
      
      <LightBulbContainer>
        <img src="/lightbulb.svg" alt="Lightbulb" width={60} height={60} />
      </LightBulbContainer>
      
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputIcon>
            <Mail size={20} />
          </InputIcon>
          <Input
            type="email"
            placeholder="Enter Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputIcon>
            <Lock size={20} />
          </InputIcon>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordToggle
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </PasswordToggle>
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      
      <Divider>
        <span>Or Login With</span>
      </Divider>
      
      <SocialLoginContainer>
        <SocialButton onClick={() => handleSocialLogin('facebook')}>
          <img src="/facebook.svg" alt="Facebook" />
        </SocialButton>
        <SocialButton onClick={() => handleSocialLogin('google')}>
          <img src="/google.svg" alt="Google" />
        </SocialButton>
        <SocialButton onClick={() => handleSocialLogin('apple')}>
          <img src="/apple.svg" alt="Apple" />
        </SocialButton>
      </SocialLoginContainer>
      
      <Footer>
        Don't have an account? <Link href="/auth/signup">Sign Up</Link>
      </Footer>
      
      <BottomDivider />
    </Container>
  );
};

export default LoginForm; 