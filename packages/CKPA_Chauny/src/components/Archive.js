import React from "react";
import { connect, styled, decode } from "frontity";
import Link from "@frontity/components/link";
import FeaturedMedia from "./Featured-media";
import dayjs from "dayjs";
import Pagination from "./Pagination";
import { HiOutlineX } from "react-icons/hi";

function Archive({ state, actions, libraries }) {
  const data = state.source.get(state.router.link);
  const Html2React = libraries.html2react.Component;
  const category = state.source.category[data.id];
  const categories = state.source.category;
  const authors = Object.values(state.source.author);

  return (
    <>
      <Items show={state.theme.isSideMenuOpen}>
        {data.items.map((item) => {
          const post = state.source[item.type][item.id];

          return (
            <article className="post" key={item.id}>
              <ImageContainer>
                <Link link={post.link}>
                  {<FeaturedMedia id={post.featured_media} />}
                </Link>
              </ImageContainer>
              <PostInfo>
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
                <AuthorDate>
                  <ul>
                    {authors
                      .filter((el) => el.id == post.author)
                      .map((auth, index) => {
                        return (
                          <li key={index}>
                            Auteur: <strong> {auth.name}</strong>
                          </li>
                        );
                      })}
                  </ul>

                  <span>
                    Date:
                    <strong> {dayjs(post.date).format("DD/MM/YYYY")}</strong>
                  </span>
                </AuthorDate>
                <CategoriesList>
                  {post.categories.map((category, index) => {
                    return (
                      <li key={index}>
                        <button>
                          <Link link={categories[category].link}>
                            {categories[category].name}
                          </Link>
                        </button>
                      </li>
                    );
                  })}
                </CategoriesList>
              </PostInfo>
            </article>
          );
        })}
        <Pagination />
      </Items>
      <SideBar show={state.theme.isSideMenuOpen}>
        <HiOutlineX
          onClick={actions.theme.closeSideMenu}
          className="close-Icon"
        />
        {data.isArchive && <h2>Articles Dans Cette Page</h2>}
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

export default connect(Archive);

const SideBar = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 25%;
  height: 100%;
  overflow: auto;
  background-color: var(--background-light-grey);
  padding: 1rem 1.5rem;
  box-shadow: -1px 0 5px var(--lightblue);
  transition: all 0.5s;
  transform: ${({ show }) => (show == false ? "translateX(100%)" : "none")};
  @media (max-width: 950px) {
    display: none;
  }
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
      font-size: 0.9rem;
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
  width: ${({ show }) => (show ? "75%" : "100%")};
  @media (max-width: 950px) {
    width: 100%;
  }

  .post {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 1rem;
    margin: 1rem auto;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 0 3px var(--lightblue);
    transition: 0.3s all;

    @media (max-width: 650px) {
      display: block;
    }
    .post-id {
      pointer-events: none;
      opacity: 0;
    }
    h2 a {
      color: black;
      font-size: 1.7rem;
    }
    h2 a:hover {
      color: var(--sky);
    }
    a {
      text-decoration: none;
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
`;
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;
const CategoriesList = styled.ul`
  display: flex;
  align-items: center;

  li button {
    display: inline-block;
    margin: 0 auto;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    padding: 5px 15px;
    font-size: 14px;
    line-height: 1.42857143;
    border: none;
    border-radius: 0.2rem;
    color: white;
    background-color: var(--sky);
    transition: 0.3s;
    margin: 0.5rem;
    margin-left: 2px;
  }
  li button a {
    color: white;
  }
  li button:hover {
    background-color: white;
    a {
      color: var(--sky);
    }
  }
`;
const ImageContainer = styled.div`
  max-width: 300px;
  transition: box-shadow 0.3s ease-in-out;
  div:hover {
    box-shadow: 0 0 5px var(--lightblue);
  }
  @media (max-width: 650px) {
    display: none;
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

const AuthorDate = styled.div`
  font-size: 0.8rem;
  display: flex;
  span {
    margin: 0 0.5rem;
  }
`;
