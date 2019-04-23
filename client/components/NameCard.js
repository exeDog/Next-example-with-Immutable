import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from './Button';

const NameCardBase = ({ className, text, showLoginBox, showSignUpBox }) => (
  <div className={className}>
    <div>
      <div style={{ padding: '10px' }}>{text}</div>
      <div>
        <Button>
          <Link href="/search">
            <a>Continue without logging in</a>
          </Link>
        </Button>
        <Button onClick={showLoginBox}>Log in</Button>
        <Button onClick={showSignUpBox}>Create account</Button>
      </div>
    </div>
    <style jsx>{
      `
      a {
         color: inherit;
         text-decoration: none
      }
      `
    }</style>
  </div>
);

export const NameCard = styled(NameCardBase)`
display: flex;
text-align: center;
font-size: 20px;
margin: auto;
justify-content: center;
padding: 1.5rem 2rem;
border-radius: 7px;
box-shadow: 0 2px 10px rgba(0,0,0,0.12);
width: 100%;
max-width: 600px;
`;
