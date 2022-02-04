import Root from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import menuHandler from "./components/handlers/menu-handler";

export default {
  name: "CKPA_Chauny",
  roots: {
    theme: Root,
  },
  state: {
    theme: {
      autoPrefetch: "in-view",
      menuUrl: "header",
      // State for the menu on mobile
      isMobileMenuOpen: false,
      isCategoriesMenuOpen: false,
      isSideMenuOpen: false,
      isSearchBarOpen: false,
      isSlideVisible: false,
    },
  },
  actions: {
    theme: {
      openMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = true;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      openCategoriesMenu: ({ state }) => {
        state.theme.isCategoriesMenuOpen = true;
      },
      closeCategoriesMenu: ({ state }) => {
        state.theme.isCategoriesMenuOpen = false;
      },
      openSideMenu: ({ state }) => {
        state.theme.isSideMenuOpen = true;
      },
      closeSideMenu: ({ state }) => {
        state.theme.isSideMenuOpen = false;
      },
      openSearchBar: ({ state }) => {
        state.theme.isSearchBarOpen = true;
      },
      closeSearchBar: ({ state }) => {
        state.theme.isSearchBarOpen = false;
      },
      toggleGalery: ({ state }) => {
        state.theme.isSlideVisible = !state.theme.isSlideVisible;
      },
      beforeSSR: async ({ state, actions }) => {
        await actions.source.fetch(`/menu/${state.theme.menuUrl}/`);
        await actions.source.fetch(`/actualites`);
      },
    },
  },
  libraries: {
    html2react: {
      processors: [link, image, iframe],
    },
    source: {
      handlers: [menuHandler],
    },
  },
};
