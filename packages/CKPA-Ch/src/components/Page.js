import React, { useState } from "react";
import { connect, Head, styled } from "frontity";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Featuredmedia from "./Featured-media";
const Page = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const page = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;

  const [current, setCurrent] = useState(0);
  const images = Object.values(state.source.attachment);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }
  if (state.router.link === "/gallerie/") {
    return (
      <>
        <Head>
          <title>{page.title.rendered}</title>
          <meta name="description" content={page.excerpt.rendered} />
        </Head>
        {/* <div>
          <Html2React html={page.content.rendered} />
        </div> */}
        <Slide>
          <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
          <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
          {images.map((img, index) => {
            return (
              <div
                key={img.id}
                className={index === current ? "slide active" : "slide"}
              >
                {index === current && state.theme.featured.showOnPost && (
                  <Featuredmedia id={img.id} />
                )}
              </div>
            );
          })}
        </Slide>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>{page.title.rendered}</title>
          <meta name="description" content={page.excerpt.rendered} />
        </Head>
        <PageContent>
          <Html2React html={page.content.rendered} />
        </PageContent>
      </>
    );
  }
};

export default connect(Page);

const Slide = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .right-arrow {
    position: absolute;
    top: 50%;
    right: 32px;
    font-size: 2rem;
    color: black;
    z-index: 10;
    cursor: pointer;
  }
  .left-arrow {
    position: absolute;
    top: 50%;
    left: 32px;
    font-size: 2rem;
    color: black;
    z-index: 10;
    cursor: pointer;
  }

  .slide {
    opacity: 0;
    transition-duration: 1s ease;
  }

  .slide.active {
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.04);
  }
`;

const PageContent = styled.div`
  /* Input fields styles */
  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }
  ul {
    text-align: center;
    list-style: none;
    line-height: 1.5;
    a {
      text-decoration: none;
      color: inherit;
    }
    a:hover {
      color: var(--light-black);
    }
    li:hover {
      transition: all 0.3s;
      background-color: var(--light-grey);
    }
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
  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.4rem;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-color: var(--sky);
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 0.4rem;
    color: #fff;
    transition: 0.3s;

  }
  input[type="submit"]:hover {
    background-color: white;
    color: #1f38c5;
  }
`;
