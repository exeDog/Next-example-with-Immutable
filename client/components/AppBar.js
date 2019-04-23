import React from 'react';
import styled from 'styled-components';
import { MerlinLogo } from '../assets/MerlinLogoSVG';

const AppBarBase = ({ className, title }) => (
  <div className={className}>
    <h2>{title}</h2>
    <MerlinLogo />
  </div>
);

export const AppBar = styled(AppBarBase)`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  padding: 16px;
  h2 {
    color: white;
    margin: 0;
    font-weight: 400;
  }
  background-color: ${props => props.theme.primary};
`;
