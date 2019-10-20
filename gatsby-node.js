const { buildSiteTree, canonicalName } = require('gatsby-source-silverstripe');

exports.createPages = async ({graphql, actions, getNodesByType }) => {
	const requiredClasses = [
		"SilverStripe\\CMS\\Model\\SiteTree",
		"SilverStripe\\SiteConfig\\SiteConfig",
	];
	const errors = [];
	requiredClasses.forEach(type => {
		const exists = getNodesByType('SilverStripeDataObject').find(node => node.ancestry.includes(type));
		if (!exists) {
			errors.push(
				`Required dataobject "${canonicalName(type)}" is missing from the schema. Cannot build site tree.
				Check your canView permissions?`
			);
		}
	});
	if (errors.length) {
		errors.map(e => console.error(e));
	} else {
		buildSiteTree({ graphql, actions });
	}	

	Promise.resolve();
}