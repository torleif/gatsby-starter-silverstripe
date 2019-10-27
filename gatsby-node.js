const path = require('path');
const { buildSiteTree, canonicalName } = require('gatsby-source-silverstripe');
const LoadablePlugin = require('@loadable/webpack-plugin')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
	plugins: [new LoadablePlugin()],
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src/'),
		},
	}
  })
}

exports.createPages = async ({graphql, actions, getNodesByType }) => {
	const requiredTypes = [
		"SSSiteTree",
		"SSSiteConfig",
	];
	const errors = [];
	requiredTypes.forEach(type => {
		const exists = !!getNodesByType(type).length;
		if (!exists) {
			errors.push(
				`Required type "${type}" is missing from the schema. Cannot build site tree.
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