"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var core_auth_1 = require("@azure/core-auth");
var src_1 = require("../../src");
var chai_1 = require("chai");
var recordedClient_1 = require("../utils/recordedClient");
describe("TenDlcClient - constructor", function () {
    var endpoint = "https://contoso.spool.azure.local";
    var accessKey = "banana";
    it("successfully instantiates with valid connection string", function () {
        var client = new src_1.TenDlcClient("endpoint=".concat(endpoint, ";accesskey=").concat(accessKey));
        chai_1.assert.instanceOf(client, src_1.TenDlcClient);
    });
    it("throws with invalid connection string", function () {
        chai_1.assert.throws(function () {
            new src_1.TenDlcClient("endpoints=".concat(endpoint, ";accesskey=").concat(accessKey));
        });
    });
    it("successfully instantiates with with endpoint and access key", function () {
        var client = new src_1.TenDlcClient(endpoint, new core_auth_1.AzureKeyCredential(accessKey));
        chai_1.assert.instanceOf(client, src_1.TenDlcClient);
    });
    it("successfully instantiates with with endpoint and managed identity", function () {
        var client = new src_1.TenDlcClient(endpoint, (0, recordedClient_1.createMockToken)());
        chai_1.assert.instanceOf(client, src_1.TenDlcClient);
    });
});
