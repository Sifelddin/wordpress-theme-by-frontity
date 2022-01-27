import { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "@frontity/components/link";

/**
 * Pagination Component
 *
 * It's used to allow the user to paginate between a list of posts.
 *
 * The `state`, `actions`, `libraries` props are provided by the global context,
 * when we wrap this component in `connect(...)`
 */
const Pagination = ({ state, actions }) => {
  // Get the total posts to be displayed based for the current link
  const { next, previous } = state.source.get(state.router.link);

  // Pre-fetch the the next page if it hasn't been fetched yet.
  useEffect(() => {
    if (next) actions.source.fetch(next);
  }, []);

  return (
    <Wrapper SideBarVisible={state.theme.isSideMenuOpen}>
      {/* If there's a next page, render this link */}
      {next && (
        <Link link={next}>
          <Text>←Articles précé</Text>
        </Link>
      )}{" "}
      {/* If there's a previous page, render this link */}
      {previous && (
        <Link link={previous}>
          <Text>Articles suiv →</Text>
        </Link>
      )}
    </Wrapper>
  );
};

/**
 * Connect Pagination to global context to give it access to
 * `state`, `actions`, `libraries` via props
 */
export default connect(Pagination);
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: ${({ SideBarVisible }) => SideBarVisible && "0.8rem"};
    text-decoration: none;
    scroll-behavior: auto;
  }
`;
const Text = styled.em`
  display: inline-flex;
  margin-top: 16px;
  color: black;
`;
