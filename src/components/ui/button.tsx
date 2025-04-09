import styled from "styled-components"

export const Button = styled.button<{ variant?: 'default' | 'ghost'; size?: 'default' | 'icon' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  
  ${props => props.variant === 'ghost' && `
    background: transparent;
    border: none;
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  `}
  
  ${props => props.size === 'icon' && `
    width: 2rem;
    height: 2rem;
    padding: 0;
  `}
`; 