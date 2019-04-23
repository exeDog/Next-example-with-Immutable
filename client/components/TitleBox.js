import React from 'react';
import styled from 'styled-components';

const TitleBoxBase = ({ className, text }) => (
  <div className={className}>
    <h1 style={{ text }}>{text}</h1>

    <style jsx>{
      `h1 {
        font-size: 1.601806640625em
        font-weight: bold;
        font-family: "Georgia", Times, serif;
      }`
    }
    </style>
  </div>
);


export const TitleBox = styled(TitleBoxBase)`
display: flex;
justify-content: center;
margin: 0.8rem 0 2rem 0;
`;
