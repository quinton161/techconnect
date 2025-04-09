'use client';

import { useState, useCallback, memo } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Eye, EyeOff } from 'lucide-react';

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #0088CC;
    box-shadow: 0 0 0 2px rgba(0, 136, 204, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
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
  padding: 0.75rem;
  background: #0088CC;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
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

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

// Memoized input component
const FormInput = memo(({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  required 
}: { 
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <Input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
  />
));

FormInput.displayName = 'FormInput';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateForm = useCallback(() => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  }, [email, password, confirmPassword]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setError('');
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push('/');
    } catch (err: any) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please try logging in instead.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters long.');
          break;
        default:
          setError('An error occurred during signup. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, confirmPassword, validateForm, router]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <FormInput
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
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

        <InputGroup>
          <FormInput
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </Form>
    </FormContainer>
  );
}