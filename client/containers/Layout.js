import React from 'react';
import styled from 'styled-components';
import { AppBar } from '../components/AppBar';

const LayoutBase = ({ children, className }) => (
  <div className={className}>
    <AppBar title="Merlin Labs Code Challenge" />
    <div className="inner-content">{children}</div>
  </div>
);

export const Layout = styled(LayoutBase)`
  & .inner-content {
    padding: 16px;
    margin-top: 64px;
  }
`;
