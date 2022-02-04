import React, { useEffect, useState } from "react";
import { connect, Global, css, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import Archive from "./Archive";
import Post from "./post";
import Page from "./Page";
import Loading from "./Loading";
import Error from "./Error";
import NavBar from "./navigation/NavBar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { useTransition, animated } from "react-spring";
import Title from "./title";
import CatList from "./catList";

const Root = ({ state, actions }) => {
  const data = state.source.get(state.router.link);

  const transitions = useTransition(state.router.link, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, display: "none" },
  });

  //scroll navBar logic
  const [scrollTopValue, setScrollTopValue] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showNavBar, setShowNavBar] = useState(true);

  const scrollNavBar = () => {
    typeof window !== "undefined" ? setScrollTopValue(window.scrollY) : true;
    scrollTopValue > lastScrollTop ? setShowNavBar(false) : setShowNavBar(true);
    setLastScrollTop(scrollTopValue);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollNavBar);
    return () => window.removeEventListener("scroll", scrollNavBar);
  }, [scrollTopValue]);

  return (
    <>
      <Global styles={globalStyle} />
      <Head>
        <html lang="fr" />
        <meta
          charset="UTF-8"
          name="description"
          content={state.theme.description}
        />
      </Head>
      <Title />
      <div
        onClick={() => {
          if (state.theme.isMobileMenuOpen) {
            actions.theme.closeMobileMenu();
          }
          if (state.theme.isCategoriesMenuOpen) {
            actions.theme.closeCategoriesMenu();
          }
        }}
      >
        <Header showNavBar={showNavBar}>
          <NavBar />
        </Header>

        <Main searchBarVisible={state.theme.isSearchBarOpen} Data={data}>
          {transitions.map(({ props, key }) => (
            <animated.div style={props} key={key}>
              {data.isError || (
                <Banner Data={data} showSideBar={state.theme.isSideMenuOpen}>
                  <h1 id="#top">CANOË KAYAK PLEIN AIR</h1>
                  <p>Ouvert toute l'année</p>
                  {data.isArchive && <CatList showNavBar={showNavBar} />}
                </Banner>
              )}
              <Switch>
                <Loading when={data.isFetching} />
                <Archive when={data.isArchive} />
                <Post when={data.isPost} />
                <Page when={data.isPage} />
                <Error when={data.isError} />
              </Switch>
            </animated.div>
          ))}
          {scrollTopValue > 500 && (
            <a href="#top">
              <BsFillArrowUpCircleFill className="arrow-up" />
            </a>
          )}
        </Main>
        <Footer Data={data} showSideBar={state.theme.isSideMenuOpen} />
        <SearchBarBgContainer
          show={state.theme.isSearchBarOpen}
          onClick={actions.theme.closeSearchBar}
        >
          <SearchBar />
        </SearchBarBgContainer>
      </div>
    </>
  );
};

export default connect(Root);

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.4);
  z-index: ${({ showNavBar }) => (showNavBar ? "10" : "-1")};
  transition: all 0.3s;
  transform: ${({ showNavBar }) => (showNavBar ? "none" : "translateY(-100%)")};
`;

const Banner = styled.div`
  padding: 2rem;
  position: relative;
  @media (min-width: 1050px) {
    transition: all 0.5s;
    max-width: ${({ Data, showSideBar }) =>
      Data.isArchive && showSideBar ? "75%" : "100%"};
  }
  text-align: center;
`;

const Main = styled.main`
  max-width: ${({ Data }) => (Data.isArchive ? "70%" : "100%")};
  padding: 5rem 0;
  margin: 0 auto;
  @media (max-width: 1220px) {
    max-width: ${({ Data }) => Data.isArchive && "75%"};
  }
  @media (max-width: 1150px) {
    max-width: ${({ Data }) => Data.isArchive && "80%"};
  }

  /* @media (max-width: 800px) {
    max-width: 90%;
  } */
  h2 {
    margin: 0.5em 0;
  }
  p {
    line-height: 1.25em;
    margin-bottom: 0.75em;
  }

  .arrow-up {
    position: fixed;
    bottom: 3rem;
    right: 2rem;
    /* top: 85vh;
    right: 5%; */
    font-size: 2rem;
    z-index: ${({ searchBarVisible }) => (searchBarVisible ? "-1" : "20")};
    animation: bounce 2s ease-in-out infinite;
    color: var(--background-nav);
    background-color: white;
    border-radius: 50%;
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }
`;

const SearchBarBgContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 20;
  transition: ${({ show }) => (show ? "all 0.3s ease-in-out" : "none")};
  ${({ show }) =>
    show
      ? "opacity : 1 ; pointer-events : auto;"
      : " opacity : 0; pointer-events: none; "};
`;
const globalStyle = css`
  :root {
    --background-light-grey: rgb(253 253 253);
    --background-light-blue: rgb(248 250 255);
    --green: #95a595;
    --background-nav: #1d2130;
    --light-grey: #f3f9fb;
    --lightblue: rgba(119, 142, 235, 0.95);
    --light-black: #2a2c32f2;
    --sky: rgb(2 132 199);
  }

  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }
  body {
    /* background-color: #f5f5f5; */
    background-color: var(--background-light-blue);
  }
  h1,
  h2,
  h3,
  h4 {
    font-size: 1.4rem;
  }
  p {
    font-size: 1rem;
  }
`;
