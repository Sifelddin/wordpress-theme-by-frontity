import React from "react";
import { connect, styled } from "frontity";
import Icons from "./Icons";
import Nav from "./Nav";
import Link from "@frontity/components/link";

const NavBar = ({ state }) => {
  return (
    <NavBarContainer>
      <h1 className="brand">
        <Link link="/">{state.frontity.title}</Link>
      </h1>
      <Nav />
      <Icons />
    </NavBarContainer>
  );
};

export default connect(NavBar);

const NavBarContainer = styled.div`
  background-color: var(--background-nav);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  color: var(--light-grey);
  @media (max-width: 700px) {
    padding: 0.5rem 0.5rem;
  }
  .brand a {
    margin-left: 2rem;
    font-size: 1.4rem;
    text-shadow: 0 1px 2px lightgrey;
  }

  @media (max-width: 1000px) {
    .brand a {
      margin: 0;
    }
  }
  @media (max-width: 780px) {
    .brand a {
      font-size: 1.2rem;
    }
  }
  .brand a:hover {
    transition: 0.3s color;
    color: lightgrey;
  }

  a {
    font-weight: 500;
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 650px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

