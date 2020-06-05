# Gatsby default starter

A starter for building websites with [Pismic](https://prismic.io) and [Gatsby](https:/gatsby.org)

## Getting started

### Requirements

+ [Node.js](https://nodejs.org/)

### Create codebase

Click on "Use this repository" button to [create your own repository from this template](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

### Create content in Prismic

1. Goto [Prismic](https://prismic.io) and create an account and repository if you do not already have one.
2. Copy the subdomain name of the repository to the `process.env.PRISMIC_REPO_NAME` environment variable. In this example the url.
2. Create a custom type, by copy the schemas from [src/schemas](https://github.com/prismicio/gatsby-starter-default/tree/master/src/schemas) in to the JSON editor and save.
3. Do this for each of the custom-types in the src/schemas directory then return to the repository dashboard and navigate to content and create some content for each of the custom-types.
4. Click __save -> publish -> publish now__.

### Preview a release

1. Select some content to edit and make a change and click __save -> publish -> publish it during a release__
2. This will walk you though creating a new release.
3. Once the release is created go back to the repository dashboard and click on the name of the release name in the top bar navigation.
4. The release id can now be found in the url. in this example the release-id is `XtdZ4BIAACMANi0x`.
![](https://github.com/prismicio/gatsby-starter-default/tree/master/docs/images/releaseID.png)
5. Add this id to the environment variables in `gatsby-config.js` as `process.env.PRISMIC_RELEASE_ID`.
6. Create a preview in Prismic __settings -> previews -> create a preview__ set the name to `local-release` the domain to `http://localhost:8000` and set the preview path to `/previews`.
7. Add this preview path to `gatsby-config.js` as `process.env.PRISMIC_PREVIEW_PATH`. 
8. To see the preview build run `GATSBY_CLOUD=true npm start`


## Gatsby cloud

1. Go to [gatsby.com](https://www.gatsbyjs.com/) and log-in with github and select __create a new site__.
2. Select __I have a gatsby site__.
3. Select the repository that this template has been used in.
4. For integrations choose __skip this step__.
5. Set the environment variables in gatsby cloud.
6. Click __save__ and __create site__

### Webhooks

Create two webhooks one for gatsby's production build and preview builds in prismic by following the [prismic user guide](https://user-guides.prismic.io/en/articles/790505-webhooks) and the urls that can be found for the project on gatsby.com underneath ___site settings -> webhooks__,
