import { connect, styled } from "frontity";
import React, { useState, useRef, useEffect } from "react";
import Link from "@frontity/components/link";
import { HiOutlineX } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ state, actions }) => {
  const categories = Object.values(state.source.category);
  const posts = Object.values(state.source.post);
  const [filtredData, setFiltredData] = useState([]);
  const inputElement = useRef(null);

  const handleChange = (e) => {
    let searchWord = e.target.value.toLowerCase();
    const newPostesFilter = posts.filter((value) => {
      return value.title.rendered.toLowerCase().includes(searchWord);
    });
    const newcategoriesFilter = categories.filter((value) => {
      return value.name.toLowerCase().includes(searchWord);
    });
    searchWord === ""
      ? setFiltredData([])
      : setFiltredData([...newPostesFilter, ...newcategoriesFilter]);
  };

  // make input focus when search bar popup and render filtredData array empty when closing the search bar
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
    setFiltredData([]);
  }, [state.theme.isSearchBarOpen]);
  // clear input value when closing the search bar
  if (!state.theme.isSearchBarOpen && inputElement.current !== null) {
    inputElement.current.value = "";
  }

  return (
    <>
      <SearchPopUp
        show={state.theme.isSearchBarOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <SearchBarContainer>
          <input
            type="text"
            placeholder="Rechercher un contenu..."
            onChange={handleChange}
            ref={inputElement}
          />
          <button className="submitBtn" type="submit">
            <FaSearch />
          </button>
          <button className="closeBtn">
            <HiOutlineX onClick={actions.theme.closeSearchBar} />
          </button>
        </SearchBarContainer>
        <Results>
          {filtredData.length > 0 && (
            <ul>
              {filtredData.slice(0, 10).map((value, index) => {
                return (
                  <li key={index}>
                    <Link
                      link={value.link}
                      onClick={actions.theme.closeSearchBar}
                    >
                      <span className="search-type">
                        {value.type || "Category"}
                      </span>
                      <SearchWord is_post={value.type}>
                        {value.name || value.title.rendered.toLowerCase()}
                      </SearchWord>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Results>
      </SearchPopUp>
    </>
  );
};

export default connect(SearchBar);

const SearchPopUp = styled.div`
  position: fixed;
  top: 3rem;
  left: auto;
  right: auto;
  width: 600px;
  opacity: 1;
  color: black;
  transition: ${({ show }) => (show ? "all 0.3s" : "none")};
  transform: ${({ show }) => (show ? "translateY(0)" : "translateY(-50px)")};
  @media (max-width: 650px) {
    width: 90%;
  }
`;
const SearchBarContainer = styled.div`
  position: relative;
  background: var(--background-light-grey);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0.5rem 1rem;

  input {
    border: 1px solid var(--lightblue);
    color: black;
    padding: 0.5rem 2rem;
    display: block;
    width: 100%;
    min-height: 48px;
    font-size: medium;
    border-radius: 5px;
    z-index: 10;
    @media (max-width: 650px) {
      font-size: small;
    }
  }
  input:focus {
    outline: 1px solid blue;
  }
  .submitBtn {
    display: inline-flex;
    position: absolute;
    top: 50%;
    left: 1.5rem;
    transform: translateY(-50%);
    cursor: pointer;
    border: none;
    background: transparent;
    font-size: 1rem;
  }
  .closeBtn {
    display: inline-flex;
    position: absolute;
    top: 50%;
    right: 1.2rem;
    transform: translateY(-50%);
    cursor: pointer;
    border: none;
    background: transparent;
    font-size: 1.3rem;
  }
`;

const Results = styled.div`
  background: var(--background-light-grey);
  padding: 1rem;
  width: inherit;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 100%;

  ul {
    list-style: none;
    li {
      line-height: 1.5;
      transition: all 0.3s;
      padding: 2px 0;
      a {
        font-family: Inter, sans-serif;
        text-decoration: none;
        color: black;
        .search-type {
          padding: 0 0.5rem;
          color: #121c4299;
          border-right: 1px solid #121c4299;
          text-transform: capitalize;
        }
        @media (max-width: 650px) {
          font-size: small;
        }
      }
    }
    li:hover {
      background-color: var(--light-grey);
    }
  }
`;
const SearchWord = styled.span`
  margin-left: 0.5rem;
  text-transform: capitalize;
  font-weight: ${({ is_post }) => (is_post == "post" ? "initial" : "bolder")};
`;
