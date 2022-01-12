import { connect, styled } from "frontity";
import Link from "@frontity/components/link";
import { RiGalleryFill } from "react-icons/ri";
import { RiContactsBook2Fill } from "react-icons/ri";
import { IoNewspaper } from "react-icons/io5";
import { ImPriceTags } from "react-icons/im";

import React from "react";

const Nav = ({ state }) => {
  //One level menu (no child menus)

  const items = state.source.get(`/menu/${state.theme.menuUrl}/`).items || [];
  console.log(items);
  return (
    <NavContainer>
      {items.map((item) => {
        return (
          <NavItem key={item.ID}>
            <Link link={item.url} className="nav-link">
              {item.title == "Gallerie" ? (
                <RiGalleryFill className="icon" />
              ) : item.title == "Nouveautés" ? (
                <IoNewspaper className="icon" />
              ) : item.title == "Contact" ? (
                <RiContactsBook2Fill className="icon" />
              ) : item.title == "Tarifs" ? (
                <ImPriceTags className="icon" />
              ) : (
                ""
              )}
              {item.title}
            </Link>
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

  @media (max-width: 700px) {
    display: block;
  }
`;

const NavItem = styled.div`
  .nav-link {
    display: flex;
    justify-content: center;
    align-items: center;
  
  }
  .icon {
      margin: 0 2px;
  }
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
      font-size: 0.8rem;
    }
  }
`;
