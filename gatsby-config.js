
// Can be configured in gatsby-cloud
process.env.PRISMIC_REPO_NAME = process.env.PRISMIC_REPO_NAME || "gatsby-starter-default";

process.env.PRISMIC_API_KEY = process.env.PRISMIC_API_KEY || undefined;

// Release to preview 
process.env.PRISMIC_RELEASE_ID = process.env.PRISMIC_RELEASE_ID || "XtdZ4BIAACMANi0x";

// now to set up gatsby-cloud and then a preview
// For redirecting from prismic to the page on gatsby-preview
process.env.PRISMIC_PREVIEW_PATH = process.env.PRISMIC_PREVIEW_PATH || "/previews";
// 


const linkResolver = require('./src/prismic/linkResolver');

const gastbySourcePrismicConfig = {
  resolve: 'gatsby-source-prismic',
  options: {
    repositoryName: process.env.PRISMIC_REPO_NAME,
    linkResolver,
    schemas: {
      // Custom types mapped to schemas
      homepage: require("./src/schemas/homepage.json"),
      page: require('./src/schemas/page.json')
    },
  }
};

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    gastbySourcePrismicConfig
  ],
}
