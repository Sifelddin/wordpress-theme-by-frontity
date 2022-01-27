import React from "react";
import { styled, keyframes } from "frontity";
const Loading = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default Loading;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  margin: 0 auto;
  border: 12px solid #eee;
  border-top: 12px solid steelblue;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: ${spin} 2s linear infinite;
`;
