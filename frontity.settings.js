const settings = {
  name: "CKPA_Chauny",
  state: {
    frontity: {
      url: "https://CKPA-Chauny.fr",
      title: "CANOË KAYAK PLEIN AIR",
      description: "WordPress installation for Frontity development",
    },
  },
  packages: [
    {
      name: "CKPA_Chauny",
      state: {
        theme: {
          menu: [],
          featured: {
            showOnList: true,
            showOnPost: true,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "http://localhost:80/",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@aamodtgroup/frontity-contact-form-7",
    "@frontity/head-tags",
  ],
};

export default settings;
