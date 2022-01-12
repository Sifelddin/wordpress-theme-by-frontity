import { connect, styled } from "frontity";
import { getPostsGroupedByCategory } from "./handlers/catByPost";
import Link from "@frontity/components/link";
import React from "react";

const Dropmenu = ({ state, libraries, showNavBar }) => {
  const postsPerCategory = getPostsGroupedByCategory(state.source);
  const Html2React = libraries.html2react.Component;
  return (
    <DropMenu
      onClick={(e) => e.stopPropagation()}
      show={state.theme.MenuVisible}
      navBarVisible={showNavBar}
      className="drop-menu"
    >
      {postsPerCategory.map(({ posts, category }, index) => (
        <CategoryList key={index}>
          <h2>
            <Link link={category.link}>{category.name}</Link>
          </h2>
          {posts.map((post, index) => (
            <ul key={index}>
              <li>
                <a href={"#" + post.id}>
                  <Html2React html={post.title.rendered} />
                </a>
              </li>
            </ul>
          ))}
        </CategoryList>
      ))}
    </DropMenu>
  );
};

export default connect(Dropmenu);

const DropMenu = styled.div`
  display: none;
  @media (max-width: 1050px) {
    position: absolute;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    right: 0;
    top: calc(100% + 0.5rem);
    background-color: white;
    padding: 0.75rem;
    border-radius: 0.25rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    opacity: ${({ show, navBarVisible }) =>
      show && navBarVisible ? "1" : "0"};
    transform: ${({ show, navBarVisible }) =>
      show && navBarVisible ? "TranslateY(0)" : "translateY(-10px)"};
    transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  }
`;

const CategoryList = styled.div`
  color: black;
  ul {
    list-style: none;
  }

  li a {
    font-size: 0.5rem;
  }
`;
