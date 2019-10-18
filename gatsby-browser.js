const React = require("react")
const { useStaticQuery, graphql } = require("gatsby");
const { initHierarchy } = require("sivlerstripe-gatsby-helpers");

const SiteTreeProvider = ({ children }) => {
    const hierarchy = useStaticQuery(graphql`
        {
            allSilverStripeDataObject {
                nodes {
                    ...CoreFields
                    SilverStripeSiteTree {
                        ...SilverStripeSiteTreeFields
                        Children {
                            ...CoreFields
                            SilverStripeSiteTree {
                                ...SilverStripeSiteTreeFields
                            }
                        }
                        
                    }
                }
            }
        }
    `);
    // set global state on the silverstripe helpers that rely on the hierarchy
    initHierarchy(hierarchy);

    return <>{children}</>
};
exports.wrapRootElement = ({ element }) => {
  return <SiteTreeProvider>{element}</SiteTreeProvider>
}