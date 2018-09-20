import path = require("path");
import webpackMiddleware = require("webpack-dev-middleware");
import webpack = require("webpack");
import express = require("express");
import testconfig = require("../webpack.testconfig");

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

app.get("/slow", function(req, res) {
    setTimeout(() => {
        res.status(200);
        res.end();
    }, 2000);
});

app.put("/expect-empty", function (req, res) {
    let bufs: Buffer[] = [];
    req.on('data', (data: Buffer) => {
        bufs.push(data);
    });
    req.on('end', () => {
        const buf = Buffer.concat(bufs);
        if (buf.length === 0) {
            res.status(200);
            res.end();
        } else {
            res.status(400);
            res.end("Expected empty body but got " + buf.toString('utf-8'));
        }
    });
    req.on('error', err => {
        res.status(500);
        res.end(err);
    });
});

app.listen(port, function() {
    console.log(`ms-rest-js testserver listening on port ${port}...`);
});
