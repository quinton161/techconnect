import styled from "styled-components"

const AvatarRoot = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  border-radius: 100%;
  background-color: #e5e5e5;
  width: ${props => props.className?.includes('h-8') ? '2rem' : 
          props.className?.includes('h-16') ? '4rem' : 
          props.className?.includes('h-12') ? '3rem' : '2rem'};
  height: ${props => props.className?.includes('h-8') ? '2rem' : 
           props.className?.includes('h-16') ? '4rem' : 
           props.className?.includes('h-12') ? '3rem' : '2rem'};
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const AvatarFallbackDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  line-height: 1;
  font-weight: 500;
  background-color: #e5e5e5;
  color: #666;
`;

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const Avatar = AvatarRoot;
export const AvatarImage = ({ src, alt, ...props }: AvatarImageProps) => (
  <AvatarImg src={src} alt={alt || ''} {...props} />
);
export const AvatarFallback = AvatarFallbackDiv; 