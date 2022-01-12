import React from "react";
import { connect, styled, Head } from "frontity";
import dayjs from "dayjs";
import FeaturedMedia from "./Featured-media";

function Post({ state, libraries }) {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const author = state.source.author[post.author];
  const formattedDate = dayjs(post.date).format("DD MMMM YYYY");
  const Html2React = libraries.html2react.Component;

  return (
    <>
      <Head>
        <title>{post.title.rendered}</title>
        <meta name="description" content={post.excerpt.rendered} />
      </Head>
      <div>
        <h2>{post.title.rendered}</h2>
        {/* Look at the settings to see if we should include the featured image */}
        {state.theme.featured.showOnPost && (
          <FeaturedMedia id={post.featured_media} />
        )}

        {data.isAttachment ? (
          // If the post is an attachment, just render the description property,
          // which already contains the thumbnail.
          <div
            dangerouslySetInnerHTML={{ __html: post.description.rendered }}
          />
        ) : (
          // Render the content using the Html2React component so the HTML is
          // processed by the processors we included in the
          // libraries.html2react.processors array.
          <Content>
            <Html2React html={post.content.rendered} />
          </Content>
        )}
        <PostInfo>
          <p>
            <strong>Posted: </strong>
            {formattedDate}
          </p>
          <p>
            <strong>Author: </strong>
            {author.name}
          </p>
        </PostInfo>
      </div>
    </>
  );
}

export default connect(Post);

const PostInfo = styled.div`
  background-image: linear-gradient(to right, #f4f4f4, #fff);
  margin-bottom: 1em;
  padding: 0.5em;
  border-left: 4px solid lightseagreen;
  font-size: 0.8em;

  & > p {
    margin: 0;
  }
`;
const Content = styled.div`
  background-color: rgba(27, 27, 50, 0.8);
  color: white;
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
    color: rgb(31, 56, 197);
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
