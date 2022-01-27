import React from "react";
import { BiError } from "react-icons/bi";
import { connect, styled } from "frontity";

const Error = ({ state }) => {
  return (
    <Content>
      <div>
        <h2>
          404 Error
          <BiError /> - Page introuvable
        </h2>
      </div>
      <p>
        le chemin <strong>{state.router.link}</strong> est introuvable.
      </p>
    </Content>
  );
};

export default connect(Error);

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 70vh;
`;
