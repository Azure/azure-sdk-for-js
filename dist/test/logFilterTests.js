"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var webResource_1 = require("../lib/webResource");
var httpOperationResponse_1 = require("../lib/httpOperationResponse");
var logFilter_1 = require("../lib/filters/logFilter");
var node_fetch_1 = require("node-fetch");
describe("Log filter", function () {
    it("should log messages when a logger object is provided", function (done) {
        var expected = ">> Request: {\n  \"headers\": {},\n  \"rawResponse\": false,\n  \"url\": \"https://foo.com\",\n  \"method\": \"PUT\",\n  \"body\": {\n    \"a\": 1\n  }\n}\n>> Response status code: 200\n>> Body: null\n";
        var output = "";
        var logger = function (message) { output += message + "\n"; };
        var lf = new logFilter_1.LogFilter(logger);
        var req = new webResource_1.WebResource("https://foo.com", "PUT", { "a": 1 });
        var res = new node_fetch_1.Response();
        var opRes = new httpOperationResponse_1.HttpOperationResponse(req, res);
        lf.after(opRes).then(function () {
            //console.dir(output, { depth: null });
            //console.log(">>>>>>>");
            //console.dir(expected);
            assert.deepEqual(output, expected);
            done();
        }).catch(function (err) {
            done(err);
        });
    });
});
//# sourceMappingURL=logFilterTests.js.map