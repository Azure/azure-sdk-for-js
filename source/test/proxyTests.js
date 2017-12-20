/*
 The MIT License (MIT)
 Copyright (c) 2017 Microsoft Corporation

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

"use strict";

var http = require("http"),
    net = require("net"),
    url = require("url"),
    lib = require("../lib/"),
    testConfig = require("./_testConfig");

var Base = lib.Base,
    DocumentDBClient = lib.DocumentClient,
    DocumentBase = lib.DocumentBase;

var proxy = http.createServer((req, resp) => {
    resp.writeHead(200, { "Content-Type": "text/plain" });
    resp.end();
});

proxy.on("connect", (req, clientSocket, head) => {
    var serverUrl = url.parse(`http://${req.url}`);
    var serverSocket = net.connect(serverUrl.port, serverUrl.hostname, () => {
        clientSocket.write("HTTP/1.1 200 Connection Established\r\n" +
            "Proxy-agent: Node.js-Proxy\r\n" +
            "\r\n");
        serverSocket.write(head);
        serverSocket.pipe(clientSocket);
        clientSocket.pipe(serverSocket);
    });
});

var proxyPort = 8989;
var connectionPolicy = new DocumentBase.ConnectionPolicy();
connectionPolicy.ProxyUrl = "http://127.0.0.1:8989";

describe("Validate http proxy setting in environment variable", function () {
    it("nativeApi Client Should successfully execute request", function (done) {
        proxy.listen(proxyPort, "127.0.0.1", () => {
            var client = new DocumentDBClient(testConfig.host, { masterKey: testConfig.masterKey }, connectionPolicy);
            // create database
            client.createDatabase({ id: Base.generateGuidId() }, function (err, db) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
                proxy.close();
            });
        });
    });

    it("nativeApi Client Should execute request in error while the proxy setting is not correct", function (done) {
        proxy.listen(proxyPort + 1, "127.0.0.1", () => {
            var client = new DocumentDBClient(testConfig.host, { masterKey: testConfig.masterKey }, connectionPolicy);
            // create database
            client.createDatabase({ id: Base.generateGuidId() }, function (err, db) {
                if (!err) {
                    done("Should create database in error while the proxy setting is not correct");
                } else {
                    done();
                }
                proxy.close();
            });
        });
    });
});
