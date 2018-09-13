const path = require("path");
const webpack = require("webpack");

module.exports = {
	devtool: "source-map",
	entry: [
		"./src/webApp"
	],

	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/static/"
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: "'dev'",
				sentry_key: "''",
				sentry_app: "''",
				enableSentry: false,
				enableTimeTravelDebugging: false,
				enableReduxLogger: false,
				API_URL: "'https://reqres.in'"
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	module: {
		loaders: [
			// js
			{
				test: /\.js$/,
				loaders: ["babel"],
				include: path.join(__dirname, "src")
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			},
			// html
			{
				test: /\.html$/,
				loader: "raw"
			},
			// css
			{
				test: /\.css$/,
				loaders: ["style", "css"]
			},
			// scss
			{
				test: /\.scss$/,
				loaders: ["style", "css", "autoprefixer?browsers=last 3 versions", "sass?outputStyle=expanded"]
			},
			// fonts
			{
				test: /\.(woff2?|ttf|eot|svg)$/,
				loader: "url?limit=10000"
			}
		]
	}
};
