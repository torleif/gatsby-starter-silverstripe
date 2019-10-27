import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { initHierarchy } from "silverstripe-gatsby-helpers"
const SiteTreeProvider = ({ children }) => {
    const hierarchy = useStaticQuery(graphql`
        {
            allSsDataObject {
                nodes {
                    id
                    uuid
                    parentUUID
                    ancestry
                    link
                    silverstripe_id
                    className
                    SiteTree {
                        title
                        menuTitle
                        showInMenus
                        sort
                    }
                }
            }
        }
    `);
    // set global state on the silverstripe helpers that rely on the hierarchy
    initHierarchy(hierarchy);

    return <>{children}</>
};

export default SiteTreeProvider