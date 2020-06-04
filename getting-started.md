# Getting started with Gatsby Cloud and Prismic
## Learn how to connect Gatsby Cloud with Prismic

## What is Gatsby Cloud and Prismic, and why use them together?
[Prismic](https://prismic.io) is a headless CMS that content editors can use to edit and publish content. Gatsby Cloud allows you to integrate your site with Prismic in order to run efficient builds and preview content changes made in the CMS before publishing.

## Setting up a Prismic and Gatsby site
First, you’ll need a Gatsby site with a [gatsby-source-prismic](https://www.gatsbyjs.org/packages/gatsby-source-prismic/) source plugin pulling data from Prismic. If you haven’t set that up yet, you can quickly create a new project by using the [prismic/gatsby-starter-default](https://github.com/prismicio/gatsby-starter-default) and signing up for an account at [prismic.io](https://prismic.io)

## Signing in to Gatsby Cloud
Select Sign in with GitHub. You’ll be asked to authorize the Gatsby Cloud app with your GitHub account. If you need to request access to one or more repositories, you can click “request access” here or later, when creating an instance.

Once signed in, configuring Gatsby Cloud with Prismic requires several steps that are walked through below.

## Creating an instance
Once you’ve authenticated with Cloud and GitHub, you can create an instance from the [“Create a new Gatsby Cloud site”](https://gatsbyjs.com/dashboard/sites/create) page.

Use the “I already have a Gatsby site” flow to manually integrate your site.

![](https://www.gatsbyjs.com/static/4b0022bee38a8bb336252ebcb49c3f1d/d0143/import-flow-start.png)

Pick your Gatsby site from the list of GitHub repositories. You can use the search input to narrow down the list.

![](https://www.gatsbyjs.com/static/883c06163796af2e957a7d699cd04e9e/2bef9/select-repo.png)

If you don’t see your site, it might be because it belongs to a GitHub organization, rather than your personal account. You can connect a new GitHub Organization.

*Note: Repositories must contain one Gatsby project configured at their root to be enabled. Gatsby Cloud works best with Gatsby version 2.20.16 and higher.*

## Select branch and publish directory
You’ll need to select a branch and then indicate the publish directory where the gatsby-config.js lives. If you leave the field blank, it defaults to the root of the site.

![](https://www.gatsbyjs.com/static/bab13665781f6f2f345f9a0ef84a1564/2bef9/select-branch.png)

Once the branch and base directory are correct, select “Next.”

## Create the instance

![](https://www.gatsbyjs.com/static/edde9341fa9a163886607e753f4650a2/7ca1f/integration-step.png)

### Manual Integration
First, click “Skip this step” to configure Prismic manually.


Gatsby Cloud will automatically try and detect environment variables necessary in your gatsby-config.js. However — consider adding any additional variables that automatic detection may have missed. See [“Setting up Environment Variables”](#Setting up Environment Variables) for more info.

Note that you will be able to add, delete, or update these later on in [“Site Settings”](#Setting up Environment Variables).

Once you’ve added the necessary environment variables, you can press “Create site” which will create your instance in Gatsby Cloud!

### Site is Created

After following the “Automatic Integration” or “Manual Integration” flow you now have an instance of Gatsby Cloud configured with environment variables and a provided Gatsby Preview instance you can share with your team. Woo-hoo!


### Setting up Environment Variables

An environment variable references a value that can affect how running processes will behave on a computer, for example in staging and production environments. You must save environment variables in Gatsby Cloud to authorize your instance to pull source data from Prismic.


__You will need to add into Gatsby Cloud any environment variable required for your app to run, such as deployment or test environment configuration settings.__

__You will also need to add in the following Gatsby Cloud-specific environment variables:__

| Variable | Description |
| -------- | ----------- |
| `PRISMIC_REPO_NAME` | prismic repository name |
| `PRISMIC_API_KEY` | required if prismic api access is set to private |
| `PRISMIC_PREVIEW_PATH` | a route to handle redirects from prismic to gatsby-preview |
| `PRISMIC_RELEASE_ID` | A prismic release id to build in gatsby-previews |


### Environment variables in your `gatsby-config.js`:

In your gatsby-config.js file, follow these steps:

+ In GitHub, navigate to the Gatsby site you selected for your instance

+ Navigate to the `gatsby-config.js` file at the root of the site - If you don’t have a `gatsby-config.js` file, [create one](https://www.gatsbyjs.org/docs/gatsby-config/?__hstc=247646936.26f7a3d4f1dbcdbe397a7c81785dbe96.1588758217561.1591118820931.1591176956114.23&__hssc=247646936.8.1591176956114&__hsfp=1004366510)

+ In the `gatsby-config.js` file, check that your `gatsby-source-prismic` config contains the `PRISMIC_REPO_NAME`, `PRISMIC_RELEASE_ID` and `PRISMIC_API_KEY` if using one.

> Note: in this example `PRISMIC_PREVIEW_PATH` is used in `gatsby-node.js` to conditionally create a [preview route](#Adding a preview route).


It should look something like this:


```js
const buildRelease = process.env.GATSBY_CLOUD && process.env.NODE_ENV === "development";

module.exports = {
    plugins: [
        resolve: 'gatsby-source-prismic',
        options: {
            repositoryName: process.env.PRISMIC_REPO_NAME,
            accessToken: process.env.PRISMIC_API_KEY || undefined,
            releaseID: buildRelease ? process.env.PRISMIC_RELEASE_ID : "",
            linkResolver: ({ node, key, value }) => doc => {
                // Your link resolver
            },
            schemas: {
                // Custom types mapped to schemas
            },
        }
    ]
}
```

## Setting up previews
here we configure a preview in prismic that redirects to the gatbsy preview
adding a release
setting the release id in gatsby

### Adding a preview route

When navigating from prismic to gatsby by using the preview button, the browser will be redirected to the path set when configuring the preview in prismic, (the default is `/previews`). An example of the page to redirect to the correct page from the preview rout can be found [here](https://github.com/prismicio/gatsby-starter-default/blob/master/src/templates/previews.js). 

A preview route will can conditionally be created  by adding the follwing to the projects `gatsby-node.js` a when a preview build is run in gatsby. To build the preview route locally run `GATSBY_CLOUD=true npm start`. 

```js
// gatsby-node.js
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const { GATSBY_CLOUD, NODE_ENV, PRISMIC_PREVIEW_PATH } = process.env
    
    if (GASTBY_CLOUD && NODE_ENV === 'development' && PRISMIC_PREVIEW_PATH) {
        
        createPage({
            path: PRISMIC_PREVIEW_PATH,
            component: path.resolve(__dirname, 'src/templates/previews.js'), 
            context: {
                repositoryName: PRISMIC_REPO_NAME,
                apiKey: PRISMIC_API_KEY,
            },
        });
    }
}
```


## Webhooks: Configuring your Gatsby site to work with Gatsby Cloud

### Setting up a webhook in Prismic
To make a connection between prismic and Gatsby Cloud for your site, you’ll need to configure webhooks in prismic so that content changes can be pushed to Gatsby Cloud.

You can add and edit necessary webhook information in two places in Gatsby Cloud:
+ During the “Create a new Site” process
+ After setting up an instance, on that instance’s Settings page


[Prismic documentation on webhooks](https://user-guides.prismic.io/en/articles/790505-webhooks)

### Adding a Preview Webhook
Navigate to your Gatsby Cloud instance and click __Site Settings__. Copy the Preview Webhook on this page.

![](https://www.gatsbyjs.com/static/c0c386bac17eb69ddcda78cd246ba1b5/fcbaf/webhook-preview.png)

In your Prismic repository, go to __settings > webhooks__ and click __Create a webhook__.

Name the webhook and paste the Preview webhook into the URL address field.
![](https://downloads.intercomcdn.com/i/o/178189637/bc4b8322fd6ddd2a75021158/configure.gif)

And click __add this webhook__

Your new webhook will now trigger a Gatsby Cloud Preview update any time you trigger any of the events you selected!

Then create another webhook for the using the build url from gatsby, and now the production build will automatically update when changes happen to the content in prismic.

## Wrapping Up
At this point, you now have a prismic repository configured to best support Gatsby Cloud. Edit content and watch it appear live in Gatsby Cloud!
