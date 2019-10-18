import React from "react"
import { Link, graphql } from "gatsby"

import Page from "../Page"
import SEO from "../../components/seo"

const Page = ({ data: { silverStripeDataObject }}) => {
	const { title, content } = silverStripeDataObject.SilverStripeSiteTree;
	return (
	  <Layout>
	    <SEO title={title} />
	    <h1>{title}</h1>
	    <div dangerouslySetInnerHTML={{__html: content}} />
	  </Layout>
  	);
};

export default Page

export const pageQuery = graphql`
	query ($link: String!) {
		silverStripeDataObject(link: { eq: $link }) {
			SilverStripeSiteTree {
				title
				content
			}
		}

	}
`;