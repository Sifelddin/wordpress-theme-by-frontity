import React from "react";
import { connect, styled } from "frontity";
import { getPostsGroupedByCategory } from "./handlers/catByPost";
import dayjs from "dayjs";
import Link from "@frontity/components/link";
import FeaturedMedia from "./Featured-media";
import { HiOutlineX } from "react-icons/hi";

const CatPost = ({ state, actions, libraries, ...props }) => {
  const postsPerCategory = getPostsGroupedByCategory(state.source);
  const Html2React = libraries.html2react.Component;
  return (
    <>
      <MainContent showSideBar={props.showSideBarList}>
        {postsPerCategory.map(({ posts, category }, index) => (
          <BoxCategory key={index}>
            <Heading>
              <Link link={category.link}>{category.name}</Link>
            </Heading>
            {posts.map((post, index) => (
              <article key={index}>
                <ImageContainer>
                  <Link link={post.link}>
                    {state.theme.featured.showOnPost && (
                      <FeaturedMedia id={post.featured_media} />
                    )}
                  </Link>
                </ImageContainer>
                <div className="acticle-infos">
                  <p className="post-id" id={post.id}>
                    post id : {post.id}
                  </p>
                  <Link link={post.link}>
                    <h2 id={post.title.rendered}>
                      <Html2React html={post.title.rendered} />
                    </h2>
                  </Link>
                  <PostInfos>
                    <strong>
                      <Html2React
                        html={dayjs(post.date).format("DD MMMM YYYY")}
                      />
                      <br />
                      <Html2React
                        html={state.source.author[post.author].name}
                      />
                    </strong>
                  </PostInfos>
                  <br />
                  <Html2React html={post.excerpt.rendered} />
                </div>
              </article>
            ))}
            <button className="seeMoreBtn">
              <Link link={category.link}>
                &gt;&gt; Voir plus de posts sur la category{" "}
                <strong>{category.name}</strong>
              </Link>
            </button>
          </BoxCategory>
        ))}
      </MainContent>
      <Sidebar showSideBar={props.showSideBarList}>
        <HiOutlineX
          onClick={props.handleSideBarListClick}
          className="close-Icon"
        />
        <SidebarContent>
          {postsPerCategory.map(({ posts, category }, index) => (
            <AsideCategoryList key={index}>
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

              <Link link={category.link}>
                <strong>
                  {" "}
                  &gt;&gt; Voir plus de posts sur {category.name}
                </strong>
              </Link>
            </AsideCategoryList>
          ))}
        </SidebarContent>
      </Sidebar>
    </>
  );
};

const MainContent = styled.div`
  @media (min-width: 1050px) {
    transition: all 0.5s;
    width: ${(props) => (props.showSideBar ? "75%" : "100%")};
  }
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  color: black;
  text-align: center;
  letter-spacing: 3px;
`;

const BoxCategory = styled.div`
  border-radius: 5px;
  padding: 0;
  text-align: center;
  padding-bottom: 3rem;
  box-shadow: 0 0 2px var(--lightblue);

  @media (max-width: 800px) {
    padding: 0;
    padding-bottom: 1rem;
  }
  article {
    width: 90%;
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 1rem;
    align-items: center;
    margin: 1rem auto;
    padding: 0.5rem;
    border-radius: 8px;
    text-align: start;
    transition: 0.3s all;
    box-shadow: 0 0 3px var(--sky);

    .post-id {
      pointer-events: none;
      opacity: 0;
    }
  }

  a {
    text-decoration: none;
    color: black;
    transition: 0.3s all;
  }
  h2 {
    padding: 0.5rem 0;
    font-size: 2rem;
  }
  @media (max-width: 1050px) {
    h2 {
      font-size: 1.5rem;
    }
  }
  a:hover {
    color: var(--sky);
  }

  .seeMoreBtn {
    display: inline-block;
    margin: 0 auto;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    padding: 10px 30px;
    font-size: 14px;
    line-height: 1.42857143;
    border: none;
    border-radius: 0.4rem;
    color: white;
    background-color: var(--sky);
    transition: 0.3s;
  }
  .seeMoreBtn a {
    color: white;
  }
  .seeMoreBtn:hover {
    background-color: white;
    a {
      color: var(--sky);
    }
  }
`;
const ImageContainer = styled.div`
  align-self: center;
  transition: box-shadow 0.3s ease-in-out;
  div:hover {
    box-shadow: 0 0 5px var(--sky);
  }
`;
const Sidebar = styled.aside`
  display: none;
  @media (min-width: 1050px) {
    display: block;
    position: fixed;
    right: 0;
    max-width: 25%;
    bottom: 0;
    top: 0;
    overflow: auto;
    background-color: var(--background-light-grey);
    padding: 1rem;
    box-shadow: 0 0 5px var(--lightblue);
    transition: all 0.5s;
    transform: ${(props) =>
      props.showSideBar == false ? "translateX(100%)" : "none"};
  }
  .close-Icon {
    font-size: large;
    color: black;
    cursor: pointer;
    transition: all 0.3s;
  }
  .close-Icon:hover {
    font-size: larger;
    color: var(--sky);
  }
`;
const SidebarContent = styled.div`
  padding-top: 3rem;
  margin: 0;
  font-size: large;
`;
const AsideCategoryList = styled.div`
  h2 {
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
  ul:hover {
    li {
      transform: translate(5px, 0);
    }
  }
`;

const PostInfos = styled.div`
  font-weight: bold;
  opacity: 0.6;
  font-size: 0.7rem;
`;

export default connect(CatPost);
