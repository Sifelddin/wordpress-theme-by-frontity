import { connect, styled } from "frontity";
import Link from "@frontity/components/link";
import { RiGalleryFill } from "react-icons/ri";
import { RiContactsBook2Fill } from "react-icons/ri";
import { IoNewspaper } from "react-icons/io5";
import { ImPriceTags } from "react-icons/im";
import { FaHome } from "react-icons/fa";
import { MdKayaking } from "react-icons/md";
import React from "react";

const Nav = ({ state }) => {
  //One level menu (no child menus)

  const items = state.source.get(`/menu/${state.theme.menuUrl}/`).items || [];
  const itemsLength = items.length;

  return (
    <NavContainer>
      <NavItem itemsLength={itemsLength} show={state.theme.isMobileMenuOpen}>
        {itemsLength > 0 &&
          items.map((item, index) => {
            return (
              <li key={index}>
                <Link link={item.url} className="nav-link">
                  {item.title == "Accueil" ? (
                    <FaHome className="icon" />
                  ) : item.title == "Gallerie" ? (
                    <RiGalleryFill className="icon" />
                  ) : item.title == "Actualités" ? (
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
              </li>
            );
          })}
        <li>
          <Link className="nav-link" link={"category/activites/"}>
            <MdKayaking className="icon" />
            Activités
          </Link>
        </li>
      </NavItem>
    </NavContainer>
  );
};

export default connect(Nav);

const NavContainer = styled.div`
  margin-left: 4rem;
  @media (max-width: 1000px) {
    margin-left: 2rem;
  }
  @media (max-width: 830px) {
    margin: 0;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;

const NavItem = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: all 0.5s;

  .nav-link {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    transition: 0.3s color;
    font-size: 0.9rem;
  }

  .icon {
    margin: 0 2px;
  }
  li {
    margin: 0 0.4rem;
  }

  .nav-link:hover {
    color: lightgray;
  }

  @media (min-width: 875px) {
    a {
      margin: 0 0.4rem;
    }
  }
  @media (max-width: 780px) {
    a {
      font-size: 0.8rem;
    }
  }
  @media (max-width: 650px) {
    height: ${({ show, itemsLength }) =>
      show ? itemsLength * 19.5 + 65 + "px" : "0"};
    opacity: ${({ show }) => (show ? "1" : "0")};
    margin-top: ${({ show }) => (show ? "1rem" : "0")};
    transition: 0.5s height;
    pointer-events: ${({ show }) => (show ? "auto" : "none")};
    width: 100%;
    flex-direction: column;
    text-align: center;

    li {
      width: 100%;
      padding: 0.35rem 0;
    }
    li:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
