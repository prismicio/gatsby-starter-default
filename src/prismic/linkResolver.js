const linkResolver = ({ node, key, value } = {}) => doc => {
    switch(doc.type) {
       case "homepage": return '/';
       case "page": return `${doc.uid}`;
       default: return "/";
     }
 }

module.exports = linkResolver