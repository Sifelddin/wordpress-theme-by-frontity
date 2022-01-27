const settings = {
  name: "CKPA_Chauny",
  state: {
    frontity: {
      url: "https://CKPA-Chauny.fr",
      title: "CKPA Chauny",
      description: "WordPress installation for Frontity development",
    },
  },
  packages: [
    {
      name: "CKPA_Chauny",
      state: {
        theme: {},
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "http://localhost:80/",

          homepage: "/accueil",
          postsPage: "/actualites",
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

//  url: "https://remi-lfb.fr/"

// homepage: "/accueil",
// postsPage: "/actualites",
