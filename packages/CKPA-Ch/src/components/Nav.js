import { connect, styled } from "frontity";
import Link from "@frontity/components/link";
import React from "react";

const Nav = ({ state }) => {
  //One level menu (no child menus)

  const items = state.source.get(`/menu/${state.theme.menuUrl}/`).items || [];
  return (
    <NavContainer>
      {items.map((item) => {
        return (
          <NavItem key={item.ID}>
            <Link link={item.url}>{item.title}</Link>
          </NavItem>
        );
      })}
    </NavContainer>
  );
};

export default connect(Nav);

const NavContainer = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  padding-left: 4rem;
`;

const NavItem = styled.div`
  a {
    text-decoration: none;
    margin: 0 0.8rem;
    transition: 0.3s color;
    font-size: 0.9rem;
  }
  a:hover {
    color: lightgray;
  }

  @media (max-width: 875px) {
    a {
      margin: 0 0.4rem;
    }
  }
  @media (max-width: 780px) {
   a {
      font-size: .8rem;
    }
  }
`;
