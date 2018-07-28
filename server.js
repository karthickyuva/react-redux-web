const path = require("path");
const express = require("express");
const webpack = require("webpack");
const config = require("./webpack.config");

const app = express();
const compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(express.static("assets"));
app.use(require("webpack-hot-middleware")(compiler));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8001, (err) => {
	if (err) {
		console.log(err);
		return;
	}
});
