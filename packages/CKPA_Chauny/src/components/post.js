import React from "react";
import { connect, styled, Head, decode } from "frontity";
import dayjs from "dayjs";
import FeaturedMedia from "./Featured-media";

function Post({ state, libraries }) {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const author = state.source.author[post.author];
  const formattedDate = dayjs(post.date).format("DD/MM/YYYY");
  const Html2React = libraries.html2react.Component;

  return (
    <>
      <Head>
        <meta name="description" content={decode(post.excerpt.rendered)} />
      </Head>

      <PostContent>
        <h1>{decode(post.title.rendered)}</h1>
    
        {<FeaturedMedia id={post.featured_media} />}

        {data.isAttachment ? (
          
          <div
            dangerouslySetInnerHTML={{ __html: post.description.rendered }}
          />
        ) : (
          
          <Content>
            <Html2React html={post.content.rendered} />
          </Content>
        )}
        <PostInfo>
          <p>
            <strong>Date: </strong>
            {formattedDate}
          </p>
          <p>
            <strong>Auteur: </strong>
            {author && author.name}
          </p>
        </PostInfo>
      </PostContent>
    </>
  );
}

export default connect(Post);

const PostContent = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 24px;
  h1 {
    font-size: 2rem;
    text-align: center;
  }
  @media (max-width: 870px) {
    max-width: 94%;
  }
`;
const PostInfo = styled.div`
  background-image: linear-gradient(to right, #f4f4f4, #fff);
  margin-bottom: 1em;
  padding: 0.5em;
  border-left: 4px solid lightseagreen;

  & > p {
    margin: 0;
  }
`;
const Content = styled.div`
  word-break: break-word;

  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    width: 100%;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: var(--sky);
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
