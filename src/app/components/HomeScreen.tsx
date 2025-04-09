"use client"

import { useState, useEffect, useCallback, memo } from "react"
import Image from "next/image"
import { Bell, Home, MessageSquare, MoreVertical, Send, X } from "lucide-react"
import styled from "styled-components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import BottomNav from "@/components/BottomNav"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from "firebase/firestore"
import { useRouter } from "next/navigation"

interface StyledAvatarProps {
  size?: string;
  border?: string;
}

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: white;
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
  border-bottom: 1px solid #e5e5e5;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0088CC;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 70px;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: #0088CC transparent;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #0088CC;
    border-radius: 3px;
  }
`;

const Section = styled.section`
  padding: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const StoriesContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  margin: 0 -1rem;
  padding: 0.5rem 1rem;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &::after {
    content: '';
    padding-right: 1rem;
  }
`;

const StoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 72px;
  gap: 0.25rem;
`;

const StyledAvatar = styled.div<StyledAvatarProps>`
  width: ${props => props.size || '32px'};
  height: ${props => props.size || '32px'};
  border-radius: 50%;
  border: ${props => props.border || 'none'};
  overflow: hidden;
`;

const StoryAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid #0088CC;
  padding: 2px;
  margin-bottom: 0.25rem;
  overflow: hidden;
`;

const StoryName = styled.span`
  font-size: 0.75rem;
  text-align: center;
`;

const MentorCard = styled(Card)`
  background: #0088CC;
  color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0 1rem 1rem;
  position: relative;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const MentorAvatars = styled.div`
  display: flex;
  align-items: center;
  gap: -8px;
  
  img {
    border: 2px solid white;
    margin-left: -8px;
    &:first-child {
      margin-left: 0;
    }
  }
`;

const Post = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  div {
    h3 {
      font-weight: bold;
    }
    p {
      font-size: 0.75rem;
      color: #666;
    }
  }
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  
  &.like {
    color: #ff4b4b;
  }
`;

const MentorCardContent = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: 0.25rem;
  }
`;

const MentorCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
`;

const MentorCount = styled.span`
  font-size: 0.75rem;
  color: white;
`;

const PostContent = styled.div`
  margin: 1rem 0;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const PostImage = styled.div`
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const MentorMatchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  color: #666;
  font-size: 14px;
`;

// Memoized Story component for better performance
const Story = memo(({ story }: { story: any }) => (
  <StoryItem className="cursor-pointer hover:opacity-80 transition-opacity">
    <StoryAvatar>
      <Avatar className="w-full h-full">
        <AvatarImage 
          src={story.image} 
          alt={story.name}
          loading="lazy"
        />
        <AvatarFallback>{story.name[0]}</AvatarFallback>
      </Avatar>
    </StoryAvatar>
    <StoryName>{story.name}</StoryName>
  </StoryItem>
));

Story.displayName = 'Story';

// Memoized Post component for better performance
const PostComponent = memo(({ 
  post, 
  isLiked, 
  onLike, 
  formatNumber 
}: { 
  post: any;
  isLiked: boolean;
  onLike: (id: string) => void;
  formatNumber: (num: number) => string;
}) => (
  <Post className="transform transition-transform hover:translate-y-[-2px]">
    <PostHeader>
      <UserInfo>
        <StyledAvatar size="48px">
          <Image 
            src="/images/Rectangle 2.png" 
            alt={post.author} 
            width={48} 
            height={48}
            loading="lazy"
          />
        </StyledAvatar>
        <div>
          <h3>{post.author}</h3>
          <p>{post.role}</p>
          <p>{post.time}</p>
        </div>
      </UserInfo>
      <ActionButton>
        <MoreVertical size={20} />
      </ActionButton>
    </PostHeader>
    <PostContent>
      {post.content}
    </PostContent>
    <PostImage>
      <Image
        src={post.image}
        alt="Post image"
        width={600}
        height={400}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYxMC8yOjQ4OjQ2OEA6Njs3Pi1ARERMTVEwN0VFUF1JREFNS0z/2wBDAR"
        sizes="(max-width: 500px) 100vw, 500px"
      />
    </PostImage>
    <div className="flex justify-between items-center mt-2">
      <Button 
        variant="ghost" 
        className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
        onClick={() => onLike(post.id)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        {formatNumber(post.likes)}
      </Button>
      <Button variant="ghost" className="flex items-center gap-1">
        <MessageSquare className="h-5 w-5" />
        {formatNumber(post.comments)}
      </Button>
      <Button variant="ghost" className="flex items-center gap-1">
        <Send className="h-5 w-5" />
        {formatNumber(post.shares)}
      </Button>
    </div>
  </Post>
));

PostComponent.displayName = 'PostComponent';

export default function HomeScreen() {
  const [showMentorMatch, setShowMentorMatch] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const router = useRouter();

  // Memoize handlers
  const handleLikePost = useCallback((postId: string) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });

    setPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.likes + (likedPosts.has(postId) ? -1 : 1)
          };
        }
        return post;
      })
    );
  }, [likedPosts]);

  const formatNumber = useCallback((num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }, []);

  const handleCloseMentorMatch = useCallback(() => {
    setShowMentorMatch(false);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              ...data,
              email: user.email,
              uid: user.uid
            });
            
            // Initialize stories data with exact images from the design
            setStories([
              { id: 'add', name: 'Add To Story', image: '/images/profile-pic.png' },
              { id: '1', name: 'Rodney Mayo', image: '/images/Rectangle 2.png' },
              { id: '2', name: 'Natasha Doe', image: '/images/Rectangle 3.png' },
              { id: '3', name: 'Henry Rachael', image: '/images/Rectangle 2.png' },
              { id: '4', name: 'Nelly Mundowa', image: '/images/Rectangle 3.png' },
              { id: '5', name: 'Rajesh Kumar', image: '/images/Rectangle 2.png' },
            ]);

            // Initialize posts with the exact post from the design
            setPosts([
              {
                id: '1',
                author: 'HenryDev',
                role: 'Web Developer',
                time: '30 min ago',
                content: 'Had an exciting day presenting my new VR program at the Bulawayo International Fair.',
                image: '/images/game.png',
                likes: 1400,
                comments: 29,
                shares: 4,
                profilePic: '/images/Rectangle 2.png'
              }
            ]);
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Logo>Tech Connect</Logo>
        <HeaderRight>
          <Bell size={24} className="cursor-pointer hover:text-primary transition-colors" />
          <Avatar className="cursor-pointer hover:opacity-80 transition-opacity w-8 h-8">
            <AvatarImage 
              src="/images/profile-pic.png" 
              alt={userData?.fullName}
              loading="lazy"
            />
            <AvatarFallback>{userData?.fullName?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </HeaderRight>
      </Header>

      <MainContent>
        <Section>
          <SectionTitle>Recent Updates</SectionTitle>
          <StoriesContainer>
            {stories.map((story) => (
              <Story key={story.id} story={story} />
            ))}
          </StoriesContainer>
        </Section>

        {showMentorMatch && (
          <div className="relative px-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 z-10" 
              onClick={handleCloseMentorMatch}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
            <MentorCard className="transform transition-transform hover:scale-[1.02]">
              <div className="p-2">
                <p className="text-xs text-white/90">Tech Connect App</p>
                <h3 className="text-lg font-medium mt-1">Connect With A Mentor Today!</h3>
                <div className="flex justify-between items-center mt-3">
                  <MentorAvatars>
                    {[1, 2, 3].map((num) => (
                      <Avatar 
                        key={num}
                        className="h-8 w-8 border-2 border-white transform transition-transform hover:scale-110"
                      >
                        <AvatarImage 
                          src={`/images/Rectangle ${num === 2 ? 3 : 2}.png`} 
                          alt={`Mentor ${num}`}
                          loading="lazy"
                        />
                        <AvatarFallback>M{num}</AvatarFallback>
                    </Avatar>
                    ))}
                  </MentorAvatars>
                  <Button 
                    variant="ghost" 
                    className="ml-auto text-white hover:text-white hover:bg-white/20"
                  >
                    Connect →
                  </Button>
                </div>
              </div>
            </MentorCard>
          </div>
        )}

        {posts.map((post) => (
          <Post key={post.id}>
          <PostHeader>
            <UserInfo>
                <Avatar className="w-12 h-12">
                  <AvatarImage 
                    src={post.profilePic} 
                    alt={post.author}
                    loading="lazy"
                  />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
              <div>
                  <h3 className="font-semibold text-sm">{post.author}</h3>
                  <p className="text-xs text-gray-500">{post.role}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
              </div>
            </UserInfo>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </Button>
          </PostHeader>

          <PostContent>
              {post.content}
          </PostContent>

          <PostImage>
            <Image
                src={post.image}
                alt="Post content"
                width={500}
                height={300}
                className="w-full h-auto rounded-lg"
                loading="lazy"
            />
          </PostImage>

            <PostActions>
              <Button 
                variant="ghost" 
                className={`flex items-center gap-1 ${likedPosts.has(post.id) ? 'text-red-500' : ''}`}
                onClick={() => handleLikePost(post.id)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill={likedPosts.has(post.id) ? "currentColor" : "none"}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
                {formatNumber(post.likes)}
            </Button>
            <Button variant="ghost" className="flex items-center gap-1">
              <MessageSquare className="h-5 w-5" />
                {formatNumber(post.comments)}
            </Button>
            <Button variant="ghost" className="flex items-center gap-1">
              <Send className="h-5 w-5" />
                {formatNumber(post.shares)}
            </Button>
            </PostActions>
        </Post>
        ))}
      </MainContent>
      <BottomNav />
    </Container>
  );
} 