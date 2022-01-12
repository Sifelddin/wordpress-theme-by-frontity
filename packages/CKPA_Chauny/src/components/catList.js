import { connect, styled } from "frontity";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import Link from "@frontity/components/link";
import React, { useState } from "react";

const CatList = ({ state, showNavBar, showCaegories, handleshowDropMenu }) => {
  const categories = Object.values(state.source.category);

  return (
    <>
      <Wrapper>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleshowDropMenu();
          }}
        >
          <span> Tous les categories</span>
          {showCaegories ? (
            <RiArrowUpSLine className="icon" />
          ) : (
            <RiArrowDownSLine className="icon" />
          )}
        </Button>

        <DropCatList navBarVisible={showNavBar} show={showCaegories}>
          <ul>
            {categories.map((category) => {
              return (
                <Category key={category.ID}>
                  <li key={category.ID}>
                    <Link link={category.link}>{category.name}</Link>
                  </li>
                </Category>
              );
            })}
          </ul>
        </DropCatList>
      </Wrapper>
    </>
  );
};

export default connect(CatList);

const Wrapper = styled.div`
  position: relative;
  display: inline;
  color: black;
  background-color: white;
  border-radius: 5px;
`;
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 0 3px var(--sky);
  .icon {
    font-size: large;
  }
`;
const DropCatList = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: calc(100% + 0.5rem);
  background-color: white;
  padding: 0.5rem 0;
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  opacity: ${({ show, navBarVisible }) => (show && navBarVisible ? "1" : "0")};
  transform: ${({ show, navBarVisible }) =>
    show && navBarVisible ? "TranslateY(0)" : "translateY(-10px)"};
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  pointer-events: ${({ show, navBarVisible }) =>
    show && navBarVisible ? "auto" : "none"};

  ul {
    list-style: none;
    li {
      padding: 2px;
      margin: 2px 0;
    }
  }

  li:hover {
    transition: all 0.3s;
    background-color: var(--light-grey);
  }
`;
const Category = styled.div`
  li a {
    text-decoration: none;
    color: black;
  }
`;
