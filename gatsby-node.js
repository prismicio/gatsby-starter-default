/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const {
      NODE_ENV,
      PRISMIC_RELEASE_ID,
      PRISMIC_PREVIEW_PATH,
      PRISMIC_API_KEY,
      PRISMIC_REPO_NAME,
    } = process.env;

    // discuss when to use gatsby-previews, should we allow users to use previews locally?
    // here we will create previews only on gatsby for a release
    if (PRISMIC_RELEASE_ID && PRISMIC_PREVIEW_PATH && NODE_ENV === 'development') {
      
      createPage({
        path: PRISMIC_PREVIEW_PATH,
        component: path.resolve(__dirname, 'src/templates/previews.js'),
        context: {
          repositoryName: PRISMIC_REPO_NAME,
          apiKey: PRISMIC_API_KEY,
        },
      });
    }

    const pages = await graphql(`{
      allPrismicPage {
        nodes {
          id
          uid
          lang
        }
      }
    }`);

    pages.data.allPrismicPage.nodes.forEach((page) => createPage({
        path: "/" + page.uid,
        component: path.resolve(__dirname, 'src/templates/page.js'),
        context: { id: page.id },
    }));
}