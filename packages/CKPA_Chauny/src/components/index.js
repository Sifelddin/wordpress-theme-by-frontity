import React, { useEffect, useState } from "react";
import { connect, Global, css, styled, Head } from "frontity";
import Link from "@frontity/components/link";
import Switch from "@frontity/components/switch";
import { FaSearch, FaAlignJustify, FaOutdent } from "react-icons/fa";
import List from "./list";
import Post from "./post";
import Page from "./Page";
import Loading from "./Loading";
import Error from "./Error";
import Nav from "./Nav";
import Footer from "./Footer";
import CatPost from "./catPost";
import SearchBar from "./SearchBar";
import { useTransition, animated } from "react-spring";
import Title from "./title";
import CatList from "./catList";

//import fetch from "cross-fetch";

const Root = ({ state }) => {
  const data = state.source.get(state.router.link);
  // const headtags = state.headTags.get("/nouveautes/");
  const transitions = useTransition(state.router.link, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, display: "none" },
  });

  //scroll navBar logic
  const [scrollTopValue, setScrollTopValue] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showNavBar, setShowNavBar] = useState(true);
  const [showSideBarList, setShowSideBarList] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showDropMenu, setShowDropMenu] = useState(false);

  const scrollNavBar = () => {
    typeof window !== "undefined" ? setScrollTopValue(window.scrollY) : true;
    scrollTopValue > lastScrollTop ? setShowNavBar(false) : setShowNavBar(true);
    setLastScrollTop(scrollTopValue);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollNavBar);
    return () => window.removeEventListener("scroll", scrollNavBar);
  }, [scrollTopValue]);

  //handle list click

  const handleListClick = () => {
    showSideBarList ? setShowSideBarList(false) : setShowSideBarList(true);
  };
  const handleSearchBarClick = () => {
    showSearchBar ? setShowSearchBar(false) : setShowSearchBar(true);
  };
  const handleshowDropMenu = () => {
    showDropMenu ? setShowDropMenu(false) : setShowDropMenu(true);
  };

  return (
    <>
      <Global styles={globalStyle} />
      <Title />
      <Head>
        <html lang="en" />
        <meta
          charset="UTF-8"
          name="description"
          content="Based on the Frontity step by step tutorial"
        />
      </Head>
      <div
        onClick={() => {
          if (showDropMenu == true) {
            setShowDropMenu(false);
          }
        }}
      >
        <Header showNavBar={showNavBar}>
          <NavBar>
            <h1>
              <Link link="/">{state.frontity.name}</Link>
            </h1>
            <Nav />
            <Icons>
              <FaSearch
                className="search-icon"
                onClick={handleSearchBarClick}
              />
              {data.isArchive && (
                <FaOutdent className="list-icon" onClick={handleListClick} />
              )}
            </Icons>
          </NavBar>
          <FaAlignJustify className="mobile-icon" />
        </Header>

        <Main Data={data}>
          {transitions.map(({ props, key }) => (
            <animated.div style={props} key={key}>
              <Banner Data={data} showSideBar={showSideBarList}>
                <h1>CANOË KAYAK PLEIN AIR</h1>
                <p>Ouvert toute l'année</p>
                {data.isArchive && (
                  <CatList
                    handleshowDropMenu={handleshowDropMenu}
                    showNavBar={showNavBar}
                    showCaegories={showDropMenu}
                  />
                )}
              </Banner>
              <Switch>
                <CatPost
                  showSideBarList={showSideBarList}
                  handleSideBarListClick={handleListClick}
                  when={data.isHome}
                />
                <Loading when={data.isFetching} />
                <List
                  showSideBarList={showSideBarList}
                  handleSideBarListClick={handleListClick}
                  when={data.isArchive}
                />
                <Post when={data.isPost} />
                <Page when={data.isPage} />
                <Error when={data.isError} />
              </Switch>
            </animated.div>
          ))}
        </Main>
        <Footer Data={data} showSideBar={showSideBarList} />
        <SearchBarBgContainer
          showSearchBar={showSearchBar}
          onClick={handleSearchBarClick}
        >
          <SearchBar
            showSearchBar={showSearchBar}
            handleSearchBarClick={handleSearchBarClick}
          />
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
  z-index: ${(props) => (props.showNavBar == false ? "-1" : "10")};
  transition: all 0.3s;
  transform: ${(props) =>
    props.showNavBar == false ? "translateY(-100%)" : "none"};
`;
const NavBar = styled.div`
  background-color: var(--background-nav);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 0 2rem;
  color: var(--light-grey);
  h1 {
    text-align: center;
  }
  h1 a {
    grid-column: span 1;
    text-align: center;
    font-size: 1.4rem;
    text-shadow: 0 1px 2px lightgrey;
  }

  @media (max-width: 780px) {
    h1 a {
      font-size: 1.2rem;
    }
  }
  h1 a:hover {
    transition: 0.3s color;
    color: lightgrey;
  }

  a {
    font-weight: 500;
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 700px) {
    display: flex;
  }
`;

const Main = styled.main`
  max-width: ${({ Data }) =>
    Data.isPost
      ? "80%"
      : Data.isPage
      ? "80%"
      : Data.isArchive
      ? "70%"
      : "100%"};
  padding: 5rem 0;
  margin: 0 auto;

  @media (max-width: 800px) {
    max-width: ${({ Data }) =>
      Data.isPost
        ? "90%"
        : Data.isPage
        ? "90%"
        : Data.isArchive
        ? "90%"
        : "100%"};
  }
  h2 {
    margin: 0.5em 0;
  }
  p {
    line-height: 1.25em;
    margin-bottom: 0.75em;
  }
`;
const Banner = styled.div`
  @media (min-width: 1050px) {
    transition: all 0.5s;
    max-width: ${({ Data, showSideBar }) =>
      (Data.isHome || Data.isArchive) && showSideBar ? "75%" : "100%"};
  }
  text-align: center;
`;
const Icons = styled.div`
  grid-column: span 1;
  color: inherit;
  display: flex;
  justify-content: flex-end;
  .search-icon {
    margin: 0 0.5rem;
    cursor: pointer;
  }
  .search-icon:hover {
    color: white;
  }
  .list-icon {
    margin-left: 1rem;
    cursor: pointer;
  }
  .list-icon:hover {
    color: white;
    transition: all 0.5s;
  }
  @media (max-width: 700px) {
    .list-icon {
      display: none;
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
  transition: ${(props) =>
    props.showSearchBar ? "all 0.3s ease-in-out" : "none"};
  ${(props) =>
    props.showSearchBar
      ? "opacity : 1 ; pointer-events : visible; "
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
    font-size: 1.2rem;
  }
  p {
    font-size: 0.8rem;
  }
`;
