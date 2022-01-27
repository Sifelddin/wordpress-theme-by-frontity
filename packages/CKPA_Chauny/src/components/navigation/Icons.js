import { connect, styled } from "frontity";
import React from "react";
import { FaSearch, FaIndent, FaOutdent, FaAlignJustify } from "react-icons/fa";
const Icons = ({ state, actions }) => {
  const data = state.source.get(state.router.link);

  return (
    <Container>
      <FaSearch className="search-icon" onClick={actions.theme.openSearchBar} />
      {data.isArchive &&
        (state.theme.isSideMenuOpen ? (
          <FaIndent
            className="list-icon"
            onClick={actions.theme.closeSideMenu}
          />
        ) : (
          <FaOutdent
            className="list-icon"
            onClick={actions.theme.openSideMenu}
          />
        ))}
      <FaAlignJustify
        className="mobile-icon"
        onClick={(e) => {
          e.stopPropagation();
          state.theme.isMobileMenuOpen
            ? actions.theme.closeMobileMenu()
            : actions.theme.openMobileMenu();
        }}
      />
    </Container>
  );
};

export default connect(Icons);

const Container = styled.div`
  color: inherit;
  width: 100px;
  display: flex;
  justify-content: space-around;
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
  @media (max-width: 950px) {
    .list-icon {
      display: none;
    }
  }
  .list-icon:hover {
    color: white;
    transition: all 0.5s;
  }
  .mobile-icon {
    display: none;
  }
  @media (max-width: 700px) {
    width: auto;
  }
  @media (max-width: 650px) {
    position: absolute;
    top: 1rem;
    right: 0.5rem;
    width: 200px;
    .mobile-icon {
      display: block;
      cursor: pointer;
    }
  }
  @media (max-width: 500px) {
    width: 100px;
  }
`;
