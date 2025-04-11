"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Bell, MoreHorizontal, Heart, ArrowUp } from "lucide-react"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/BottomNav"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import Link from "next/link"

// Styled components
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  color: #0077b6;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImageContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 70px;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 119, 182, 0.3);
    border-radius: 3px;
  }
`;

const Section = styled.section`
  padding: 0 1rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const StoriesContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 65px;
  gap: 0.25rem;
`;

const StoryAvatar = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 2px solid #0077b6;
  padding: 2px;
  margin-bottom: 0.25rem;
  overflow: hidden;
  position: relative;
`;

const StoryName = styled.span`
  font-size: 0.75rem;
  text-align: center;
  max-width: 65px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MentorCard = styled.div`
  background: #0077b6;
  color: white;
  border-radius: 0.5rem;
  margin: 0 1rem 1.5rem;
  position: relative;
  overflow: hidden;
  padding: 1rem;
`;

const MentorCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const MentorCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.75rem 0;
`;

const MentorCardContent = styled.div``;

const MentorAvatars = styled.div`
  display: flex;
  margin-top: 0.75rem;
`;

const MentorCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const MentorCount = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
`;

const ConnectButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  
  svg {
    margin-left: 0.25rem;
  }
`;

const Post = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const UserDetails = styled.div`
  h3 {
    font-weight: 600;
    font-size: 1rem;
    margin: 0;
  }
  p {
    font-size: 0.75rem;
    color: #666;
    margin: 0;
    line-height: 1.2;
  }
`;

const PostContent = styled.p`
  margin: 0.75rem 0;
  font-size: 1rem;
  line-height: 1.4;
`;

const PostImage = styled.div`
  margin: 0.5rem 0 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  height: 250px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const LikeCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const CommentCount = styled.div`
  color: #333;
`;

const ShareCount = styled.div`
  color: #333;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #0077b6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: none;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s, transform 0.3s;
  z-index: 20;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function HomeScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showMentorCard, setShowMentorCard] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.push('/auth');
          return;
        }

        // Get additional user data from Firestore if available
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          setUserData({
            ...userDoc.data(),
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || userDoc.data().displayName || user.email?.split('@')[0]
          });
        } else {
          // If no document exists, just use the auth data
          setUserData({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0]
          });
        }
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [router]);

  // Story data
  const stories = [
    { id: 1, name: 'Add To Story', image: '/images/default-profile.jpg', isAdd: true },
    { id: 2, name: 'Rodney Mayo', image: '/images/Ellipse 11.png' },
    { id: 3, name: 'Natasha Doe', image: '/images/Ellipse 12.png' },
    { id: 4, name: 'Henry Rathel', image: '/images/2.png' },
    { id: 5, name: 'Nelly Mundowa', image: '/images/3.png' },
    { id: 6, name: 'Rajesh Kumar', image: '/images/rajesh.jpg' }
  ];

  // Post data
  const posts = [
    {
      id: 1,
      author: "HenryDev",
      role: "Web Developer",
      time: "30 min ago",
      content: "Had an exciting day presentating my new VR program at the Bulawayo International Fair.",
      image: "/images/vr.png",
      likes: "1.4k",
      comments: 29,
      shares: 4
    },
    {
      id: 2,
      author: "Natasha Doe",
      role: "UX Designer",
      time: "2 hours ago",
      content: "Just finished my latest design project for a fintech client. Really happy with how the dashboard turned out!",
      image: "/images/design.png",
      likes: "834",
      comments: 47,
      shares: 12
    },
    {
      id: 3,
      author: "Rajesh Kumar",
      role: "Mobile Developer",
      time: "Yesterday",
      content: "Our team is looking for beta testers for our new AI-powered productivity app. DM if interested.",
      image: "/images/team.png",
      likes: "526",
      comments: 81,
      shares: 24
    }
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        const scrollTop = mainContentRef.current.scrollTop;
        setShowScrollTop(scrollTop > 300);
      }
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Container>
      <Header>
        <Logo>Tech Connect</Logo>
        <HeaderRight>
          <ProfileImageContainer>
            <Image 
              src={userData?.profileImage || "/images/default-profile.jpg"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </ProfileImageContainer>
          <Link href="/notifications">
            <Bell size={24} color="#0077b6" />
          </Link>
        </HeaderRight>
      </Header>

      <MainContent ref={mainContentRef}>
        <Section>
          <SectionTitle>Recent Updates</SectionTitle>
          <StoriesContainer>
            {stories.map((story) => (
              <StoryItem key={story.id}>
                <StoryAvatar>
                  <Image 
                    src={story.image} 
                    alt={story.name} 
                    fill
                    className="object-cover"
                  />
                </StoryAvatar>
                <StoryName>{story.name}</StoryName>
              </StoryItem>
            ))}
          </StoriesContainer>
        </Section>

        {showMentorCard && (
          <Section>
            <SectionTitle>Mentor Match</SectionTitle>
            <MentorCard>
              <MentorCardHeader>
                <div></div>
                <button 
                  onClick={() => setShowMentorCard(false)}
                  style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.25rem', cursor: 'pointer' }}
                >
                  X
                </button>
              </MentorCardHeader>
              
              <MentorCardContent>
                <MentorCardTitle>Tech Connect App</MentorCardTitle>
                <div style={{ fontSize: '1.125rem', fontWeight: '500' }}>
                  Connect With A Mentor Today!
                </div>
              </MentorCardContent>
              
              <MentorCardFooter>
                <MentorAvatars>
                  <div style={{ display: 'flex', marginRight: '0.5rem' }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          overflow: 'hidden', 
                          position: 'relative',
                          marginLeft: i > 1 ? '-8px' : '0'
                        }}
                      >
                        <Image 
                          src={`/images/${i}.png`} 
                          alt="Mentor" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <MentorCount>Over 300+ Mentors</MentorCount>
                </MentorAvatars>
                <ConnectButton>
                  Connect
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ConnectButton>
              </MentorCardFooter>
            </MentorCard>
          </Section>
        )}

        {posts.map((post) => (
          <Post key={post.id}>
            <PostHeader>
              <UserInfo>
                <UserAvatar>
                  <Image 
                    src={post.id === 1 ? "/images/default-profile.jpg" : 
                         post.id === 2 ? "/images/Ellipse 12.png" : 
                         "/images/rajesh.jpg"}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </UserAvatar>
                <UserDetails>
                  <h3>{post.author}</h3>
                  <p>{post.role}</p>
                  <p>{post.time}</p>
                </UserDetails>
              </UserInfo>
              <MoreHorizontal size={20} color="#666" />
            </PostHeader>
            
            <PostContent>
              {post.content}
            </PostContent>
            
            <PostImage>
              <Image 
                src={post.image}
                alt="Post"
                fill
                className="object-cover"
              />
            </PostImage>
            
            <PostActions>
              <ActionGroup>
                <LikeCount>
                  <Heart fill="#e00" color="#e00" size={18} />
                  {post.likes}
                </LikeCount>
                <CommentCount>{post.comments}</CommentCount>
              </ActionGroup>
              <ShareCount>{post.shares}</ShareCount>
            </PostActions>
          </Post>
        ))}
      </MainContent>

      {showScrollTop && (
        <ScrollToTopButton onClick={scrollToTop} className={showScrollTop ? 'visible' : ''}>
          <ArrowUp size={20} />
        </ScrollToTopButton>
      )}

      <BottomNav />
    </Container>
  );
} 