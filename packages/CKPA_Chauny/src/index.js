import Root from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import menuHandler from "./components/handlers/menu-handler";
import { categoriesWidgetsHome } from "./components/config";

export default {
  name: "my-first-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {
      autoPrefetch: "in-view",
      menu: [],
      menuUrl: "header",
      MenuVisible: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },
  actions: {
    theme: {
      toggleMenu: ({ state }) => {
        state.theme.MenuVisible = !state.theme.MenuVisible;
      },
      beforeSSR: async ({ state, actions }) => {
        await actions.source.fetch(`/menu/${state.theme.menuUrl}/`);
        await Promise.all(
          Object.keys(categoriesWidgetsHome).map((category) =>
            actions.source.fetch(`/category/${category}/`)
          )
        );
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
