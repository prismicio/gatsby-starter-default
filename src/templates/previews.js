import React from 'react';
import { navigate  } from 'gatsby';

import linkResolver from '../prismic/linkResolver';
import { getApi } from 'prismic-javascript'

const Previews = ({
    location: { search },
    pageContext: { repositoryName, accessToken },
}) => {

    const params = new URLSearchParams(search);
    const documentId = params.get('documentId');

    if(!documentId) return navigate('/');

    
    // this could also be retrieved from the token url.
    getApi(repositoryName, { accessToken })
        .then((api) => api.getByID(documentId))
        .then(linkResolver())
        .then((path) => navigate(path || '/'))
        .catch(() => navigate('/'));

    return <div>Loading preview...</div>
}

export default Previews
