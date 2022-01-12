import React from "react";
import { connect, styled, decode } from "frontity";
import Link from "@frontity/components/link";
import FeaturedMedia from "./Featured-media";
import dayjs from "dayjs";
import Pagination from "./Pagination";
import { HiOutlineX } from "react-icons/hi";

function List({ state, libraries, showSideBarList, handleSideBarListClick }) {
  const data = state.source.get(state.router.link);
  const Html2React = libraries.html2react.Component;
  const category = state.source.category[data.id];

  return (
    <>
      <Items showSideBar={showSideBarList}>
        {data.items.map((item) => {
          const post = state.source[item.type][item.id];
          return (
            <article className="post" key={item.id}>
              <ImageContainer>
                <Link link={post.link}>
                  {state.theme.featured.showOnPost && (
                    <FeaturedMedia id={post.featured_media} />
                  )}
                </Link>
              </ImageContainer>
              <div>
                <p className="post-id" id={post.id}>
                  post id : {post.id}
                </p>{" "}
                <h2 id={item.id}>
                  <Link link={post.link}>
                    {decode(post.title.rendered)}
                    <br />
                  </Link>
                </h2>
                <Html2React html={post.excerpt.rendered} />
                <PublishDate>
                  <Html2React html={dayjs(post.date).format("DD MMMM YYYY")} />
                </PublishDate>
              </div>
            </article>
          );
        })}
        <Pagination />
      </Items>
      <SideBar showSideBar={showSideBarList}>
        <HiOutlineX onClick={handleSideBarListClick} className="close-Icon" />
        {data.isDate && <h3>Articles {data.year}</h3>}
        {data.isCategory && <h2>{category.name}</h2>}
        <ul>
          {data.items.map((item) => {
            const post = state.source[item.type][item.id] || "post sans titre";
            return (
              <li key={post.id}>
                <a href={"#" + post.id}>
                  <Html2React html={post.title.rendered} />
                </a>
              </li>
            );
          })}
        </ul>
        <Pagination />
      </SideBar>
    </>
  );
}

export default connect(List);

const SideBar = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  max-width: 25%;
  height: 100%;
  overflow: auto;
  background-color: var(--background-light-grey);
  padding: 1rem 1.5rem;
  box-shadow: -1px 0 5px var(--lightblue);
  transition: all 0.5s;
  transform: ${({ showSideBar }) =>
    showSideBar == false ? "translateX(100%)" : "none"};

  .close-Icon {
    font-size: large;
    color: black;
    cursor: pointer;
    transition: all 0.3s;
  }
  .close-Icon:hover {
    font-size: larger;
    color: rgba(0, 0, 0, 0.9);
  }
  h2 {
    padding-top: 3rem;
    a {
      text-transform: capitalize;
      font-size: 1.3rem;
    }
  }
  ul {
    list-style: none;
    li {
      padding-left: 0.5rem;
      transition: 0.3s all;
    }
    a {
      text-decoration: none;
      color: black;
      margin: 0.8rem 0;
      font-size: 0.7rem;
      text-transform: lowercase;
      transition: 0.3s all;
    }
    a:hover {
      color: var(--light-black);
    }
  }

  a:hover {
    color: var(--hover-list);
  }
  li:hover {
    transform: translate(5px, 0);
  }
`;
const Items = styled.div`
  transition: all 0.5s;
  width: ${({ showSideBar }) => (showSideBar ? "75%" : "100%")};

  .post {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 1rem;
    margin: 1rem auto;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 0 3px var(--lightblue);
    transition: 0.3s all;
    .post-id {
      pointer-events: none;
      opacity: 0;
    }
    a {
      text-decoration: none;
      color: black;
      transition: 0.3s all;
    }
  }
  .post:hover {
    box-shadow: 0 0 6px var(--lightblue);
  }

  ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
  }

  a:hover {
    color: var(--lightblue);
  }
  p {
    font-size: 0.8em;
  }
`;
const ImageContainer = styled.div`
  max-width: 300px;
  transition: box-shadow 0.3s ease-in-out;
  div:hover {
    box-shadow: 0 0 5px var(--lightblue);
  }
`;
const PrevNextNav = styled.div`
  & > button {
    background: #eee;
    text-decoration: none;
    padding: 0.5em 1em;
    color: #888;
    border: 1px solid #aaa;
    font-size: 0.8em;
    margin-right: 2em;
    transition: 0.5s background-color;
  }
  & > button:hover {
    cursor: pointer;
    background-color: white;
  }
`;

const PublishDate = styled.div`
  font-size: 0.6rem;
`;
