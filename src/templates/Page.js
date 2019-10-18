import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import { getMenu } from "silverstripe-gatsby-helpers"
import Header from "./header"
import Logo from "../components/logo"

import "../scss/app.scss"

const Page = ({ children }) => {
  const data = useStaticQuery(graphql`
	{
		silverStripeDataObject(className: { eq: "SilverStripe__SiteConfig__SiteConfig"}) {
			SilverStripeSiteConfig {
				title
			}
  		}	
	}
  `);
  const { title } = data.silverStripeDataObject.SilverStripeSiteConfig;

  const menuItems = getMenu(1);

  return (
    <>
      <div className="topBar">
      	<div className="logo">
      		<Logo />
      	</div>
      	<navbar className="mainNav">
      		<nav>
			      <ul>
			      {menuItems.map(item => {
			      	return (
			      		<li key={item.id}>
			      			<Link to={item.link}>
			      				{item.SilverStripeSiteTree.menuTitle}
			      			</Link>
			      		</li>
			      	)
			      })}
			      </ul>
      		</nav>
      	</navbar>
      </div>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          and 
          <a href="https://www.silverstripe.org">Silverstripe CMS"</a>
        </footer>
    </>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Page
