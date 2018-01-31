import express from "express";
import webpack from 'webpack';
import config from "../webpack.config.dev";
import path from 'path';
import open from 'open';

const port = 3000;
const app = express();
const compiler = webpack(config);
const middleware = require('webpack-dev-middleware');

app.use(middleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require("webpack-dev-middleware")(compiler));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        open(`http://localhost:${port}`);
    }
});
