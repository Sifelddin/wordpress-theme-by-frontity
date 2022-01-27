import React, { useState } from "react";
import { connect, Head, styled } from "frontity";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Featuredmedia from "./Featured-media";
import Calendar from "react-calendar";

const Page = ({ state, libraries, actions }) => {
  const data = state.source.get(state.router.link);
  const page = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

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
        <SlideBackground
          show={state.theme.isSlideVisible}
          onClick={(e) => {
            e.stopPropagation();
            actions.theme.toggleGalery();
          }}
        >
          <Slide>
            <FaArrowLeft
              className="left-arrow"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
            />
            <FaArrowRight
              className="right-arrow"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
            />
            {images.map((img, index) => {
              return (
                <div
                  key={img.id}
                  className={index === current ? "slide active" : "slide"}
                >
                  {index === current && <Featuredmedia id={img.id} />}
                </div>
              );
            })}
          </Slide>
        </SlideBackground>
        <PageContent
          galery={state.router.link === "/gallerie/"}
          onClick={(e) => {
            e.stopPropagation();
            actions.theme.toggleGalery();
          }}
        >
          <Html2React html={page.content.rendered} />
        </PageContent>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>{page.title.rendered}</title>
          <meta name="description" content={page.excerpt.rendered} />
        </Head>
        <PageContent home={data.isHome}>
          <Featuredmedia id={page.featured_media} />
          {state.router.link === "/contact/" && (
            <Calendar onChange={onChange} value={value} />
          )}
          <Html2React html={page.content.rendered} />
        </PageContent>
      </>
    );
  }
};

export default connect(Page);
/* galery slide images styles */
const SlideBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${({ show }) => (show ? "flex" : "none")};
  z-index: 999;
`;
const Slide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 95%;

  .right-arrow {
    position: absolute;
    top: 50%;
    right: 100px;
    font-size: 2rem;
    color: var(--light-grey);
    z-index: 10;
    cursor: pointer;
  }
  .left-arrow {
    position: absolute;
    top: 50%;
    left: 100px;
    font-size: 2rem;
    color: var(--light-grey);
    z-index: 10;
    cursor: pointer;
  }

  @media (max-width: 1180px) {
    .left-arrow {
      left: 0;
    }
    .right-arrow {
      right: 0;
    }
  }
  @media (max-width: 900px) {
    .left-arrow {
      font-size: 1.6rem;
    }
    .right-arrow {
      font-size: 1.6rem;
    }
  }

  .slide {
    opacity: 0;
    transition-duration: 1s ease;
    margin: 1.5rem 0;
    border-radius: 5px;
  }

  .slide.active {
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.04);
  }
`;

const PageContent = styled.div`
  max-width: ${({ galery, home }) => (galery || home ? "1000px" : "800px")};
  margin: 0 auto;
  ${({ galery }) =>
    galery
      ? "padding: 10px;border: 1px solid var(--lightblue);&:hover { box-shadow: 0 0 5px var(--sky);} cursor: pointer;"
      : ""}

  @media (max-width: 870px) {
    max-width: 94%;
  }
  @media (max-width: 1070px) {
    ${({ galery, home }) => (galery || home ? "max-width:94%" : "")};
  }
  * {
    max-width: 100%;
  }
  h1,
  h2,
  h3 {
    margin: 1rem 0;
    text-align: center;
  }

  p {
    line-height: 1.6em;
  }
  ul {
    list-style: none;
    line-height: 1.5;
    ${({ galery }) =>
      galery
        ? "display : grid; grid-template-columns : 1fr 1fr 1fr;grid-gap: 10px;"
        : ""}
    @media (max-width : 650px) {
      ${({ galery }) =>
        galery
          ? "display : grid; grid-template-columns : 1fr 1fr;grid-gap: 10px;"
          : ""}
    }

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
    /* margin: 24px auto; */
    width: 100%;
    height: ${({ galery }) => (galery ? " 100%" : "auto")};
    span {
      height: ${({ galery }) => (galery ? " 100%" : "auto")};
    }
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
    width: 100%;

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

  /* Calendar styles in contact page  */
  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now {
    background: #ffff76;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;
