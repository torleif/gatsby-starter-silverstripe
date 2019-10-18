const { buildSiteTree } = require('gatsby-source-silverstripe');

exports.createPages = async ({graphql, actions}) => {
	buildSiteTree({ graphql, actions });

	Promise.resolve();
}