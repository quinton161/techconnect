import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { NotificationsNone } from '@mui/icons-material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const StoriesContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #666;
`;

const StoryImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #0088CC;
  padding: 2px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const AddStoryButton = styled(StoryImage)`
  border: 2px dashed #0088CC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const MentorCard = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  button {
    background-color: #0088CC;
    color: #fff;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
      background-color: #006699;
    }
  }
`;

const HomeScreen = () => {
  const stories = [
    { id: 1, name: 'Rodney Mayo', image: '/images/Ellipse11.png' },
    { id: 2, name: 'Natasha Doe', image: '/images/Ellipse12.png' },
    { id: 3, name: 'Henry HatFiel', image: '/images/Ellipse13.png' },
    { id: 4, name: 'Nelly Mundowa', image: '/images/Ellipse14.png' },
    { id: 5, name: 'Rajesh Kumar', image: '/images/Ellipse15.png' }
  ];

  return (
    <Container>
      <Header>
        <Logo>Tech Connect</Logo>
        <HeaderRight>
          <NotificationsNone sx={{ color: '#666', fontSize: 24 }} />
          <ProfileImage src="/images/profile-pic.png" alt="Profile" width={32} height={32} />
        </HeaderRight>
      </Header>

      <StoriesContainer>
        <StoryItem>
          <AddStoryButton>
            <span>Add Story</span>
          </AddStoryButton>
          <span>Add To Story</span>
        </StoryItem>
        {stories.map((story) => (
          <StoryItem key={story.id}>
            <StoryImage>
              <Image 
                src={story.image} 
                alt={story.name} 
                width={56} 
                height={56}
                style={{ borderRadius: '50%' }}
              />
            </StoryImage>
            <span>{story.name}</span>
          </StoryItem>
        ))}
      </StoriesContainer>

      <MentorCard>
        <div>
          <h3>Tech Connect App</h3>
          <p>Connect With A Mentor Today!</p>
        </div>
        <button>Connect</button>
      </MentorCard>
    </Container>
  );
};

export default HomeScreen; 