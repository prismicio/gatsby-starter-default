import React from 'react'
import { withPreviewResolver } from 'gatsby-source-prismic'

import Layout from '../components/layout'
import linkResolver from '../prismic/linkResolver';

const PreviewPage = ({ isPreview, isLoading }) => {
    
    if (isPreview === false) return 'Not a preview!'
    
    return(<Layout> <p>Loading</p> </Layout>);
}
  
export default (props) => {
    const { repositoryName } = props.pageContext;  
    return withPreviewResolver(PreviewPage, { repositoryName, linkResolver })(props)
}