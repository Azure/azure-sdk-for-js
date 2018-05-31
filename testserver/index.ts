import * as path from "path";
import * as webpackMiddleware from "webpack-dev-middleware";
import webpack = require("webpack");
import express = require("express");
const testconfig: webpack.Configuration = require("../webpack.testconfig");

const port = parseInt(process.env.PORT) || 3001;
const app = express();

if (process.argv.indexOf("--no-webpack") === -1) {
    app.use(webpackMiddleware(webpack(testconfig), {
        publicPath: "/"
    }));
}

app.use(express.static(path.join(__dirname, "../")));
app.use(express.static(path.join(__dirname, "../test/resources/")));

app.post("/fileupload", function(req, res) {
    req.pipe(res);
});

app.get("/set-cookie", function(req, res) {
    res.setHeader("Set-Cookie", "data=123456");
    res.end();
});

app.get("/cookie", function(req, res) {
    res.setHeader("Cookie", req.header("Cookie"));
    res.end();
});

app.get("/json", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end("[123, 456, 789]");
});

app.get("/json-charset", function(req, res) {
    res.setHeader("Content-Type", "application/json;charset=UTF-8");
    res.end("[123, 456, 789]");
});

app.get("/json-uppercase-content-type", function(req, res) {
    res.setHeader("Content-Type", "APPLICATION/JSON");
    res.end("[123, 456, 789]");
});

app.get("/json-no-content-type", function(req, res) {
    res.end("[123, 456, 789]");
});

app.get("/json-charset", function(req, res) {
    res.setHeader("Content-Type", "application/json;charset=UTF-8");
    res.end("[123, 456, 789]");
});

app.listen(port, function() {
    console.log(`ms-rest-js testserver listening on port ${port}...`);
});