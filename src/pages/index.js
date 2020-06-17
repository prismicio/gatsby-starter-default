import React from "react"
import { Link, graphql } from "gatsby"
import { RichText } from 'prismic-reactjs'

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`{
  prismicHomepage {
    data {
      meta_title
      meta_description
      meta_author
      richtext {
        raw
      }
      image {
        url
      }
    }
  }
  allPrismicPage( sort: {
    fields: data___meta_title
   }) {
    edges {
      node {
        url
        id
        data {
          meta_title
        }
      }
    }
  }
}`

const IndexPage = ({ data }) => (
  <Layout>

    <SEO title="Home" />

    <RichText render={data.prismicHomepage.data.richtext.raw} />

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <img src={data.prismicHomepage.data.image.url} alt="" />
    </div>
    
    {data.allPrismicPage.edges.map((edge, index, arr) => {
      
      const Elem = (props) => (<Link {...props} to={edge.node.url}>Go to {edge.node.data.meta_title}</Link>);
      
      return (index < arr.length - 1) ? (<React.Fragment key={edge.node.id}>
        <Elem />
        <br/>
      </React.Fragment>) : <Elem key={edge.node.id} />;
    })}

  </Layout>
)

IndexPage.query = query;

export default IndexPage
