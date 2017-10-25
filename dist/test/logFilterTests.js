"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const webResource_1 = require("../lib/webResource");
const httpOperationResponse_1 = require("../lib/httpOperationResponse");
const logFilter_1 = require("../lib/filters/logFilter");
const node_fetch_1 = require("node-fetch");
describe("Log filter", () => {
    it("should log messages when a logger object is provided", (done) => {
        const expected = `>> Request: {
  "headers": {},
  "rawResponse": false,
  "url": "https://foo.com",
  "method": "PUT",
  "body": {
    "a": 1
  }
}
>> Response status code: 200
>> Body: null
`;
        let output = "";
        const logger = (message) => { output += message + "\n"; };
        const lf = new logFilter_1.LogFilter(logger);
        const req = new webResource_1.WebResource("https://foo.com", "PUT", { "a": 1 });
        const res = new node_fetch_1.Response();
        const opRes = new httpOperationResponse_1.HttpOperationResponse(req, res);
        lf.after(opRes).then(() => {
            //console.dir(output, { depth: null });
            //console.log(">>>>>>>");
            //console.dir(expected);
            assert.deepEqual(output, expected);
            done();
        }).catch((err) => {
            done(err);
        });
    });
});
//# sourceMappingURL=logFilterTests.js.map