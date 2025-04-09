"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0088CC;
  margin-bottom: 1rem;
  text-align: center;
`;

const InterestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const InterestCard = styled(Card)<{ selected?: boolean }>`
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  border: 2px solid ${props => props.selected ? '#0088CC' : 'transparent'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const interests = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'UI/UX Design',
  'Cloud Computing',
  'DevOps',
  'Cybersecurity',
  'Blockchain',
  'Game Development',
  'AR/VR',
  'IoT'
];

export default function InterestsScreen({ userId }: { userId: string }) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest');
      return;
    }

    setIsSubmitting(true);
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        interests: selectedInterests,
        hasSetInterests: true,
        updatedAt: new Date()
      });
      router.push('/');
    } catch (error) {
      console.error('Error saving interests:', error);
      alert('Failed to save interests. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>Select Your Interests</Title>
      <p className="text-center text-gray-600">
        Choose topics you're interested in to help us personalize your experience
      </p>
      
      <InterestGrid>
        {interests.map((interest) => (
          <InterestCard
            key={interest}
            selected={selectedInterests.includes(interest)}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </InterestCard>
        ))}
      </InterestGrid>

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={isSubmitting || selectedInterests.length === 0}
      >
        {isSubmitting ? 'Saving...' : 'Continue'}
      </Button>
    </Container>
  );
} 