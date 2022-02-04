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
        theme: {
          description:
            "le club vous accueille tout l’été, le club est ouvert tous les après midi de 13h30 à 17h30. Nous accueillons les jeunes à partir de 8ans",
        },
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
    "@frontity/yoast",
  ],
};

export default settings;

//  url: "https://remi-lfb.fr/"

// homepage: "/accueil",
// postsPage: "/actualites",
