import React from 'react';
import { graphql, Link } from 'gatsby';
import { RichText } from "prismic-reactjs";
import { withPreview } from 'gatsby-source-prismic'

import Layout from "../components/layout";
import SEO from "../components/seo";

import linkResolver from '../prismic/linkResolver';

export const query = graphql`
    query($id: String!) {
        prismicPage(id: { eq: $id }) {
            data {
                meta_title
                richtext {
                    raw
                }
            }
        }
    } 
`;

const Page = ({ data }) => (<Layout>
    <SEO title={data.prismicPage.data.meta_title} />
    
    <RichText
        render={data.prismicPage.data.richtext.raw}
        linkResolver={linkResolver()}
        
        serializeHyperlink={(type, element, content, children, index) => (
            <Link key={index} to={linkResolver()(element.data)}>
                {content}
            </Link>
        )}
    />

</Layout>);

Page.query = query;

export default withPreview(Page)