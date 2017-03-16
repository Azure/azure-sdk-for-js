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

var lib = require("../lib/"),
    assert = require("assert");

var Base = lib.Base,
    DocumentDBClient = lib.DocumentClient,
    DocumentBase = lib.DocumentBase;

var host = "https://localhost:443";
var masterKey = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

// Skipping these tests for now until we find a way to run these tests in a seperate nodejs process
// Currently all tests are run in same process so we cannot update the environment variables for different tests
// This test runs fine when run independently but fails when run along with rest of the tests.
describe.skip("Validate SSL verification check for emulator", function () {
        it("nativeApi Client Should throw exception", function (done) {
            var client = new DocumentDBClient(host, { masterKey: masterKey});

            // create database
            client.createDatabase({ id: Base.generateGuidId() }, function (err, db) {
                // connecting to emulator should throw SSL verification error,
                // unless you explicitly disable it via connectionPolicy.DisableSSLVerification
                assert.equal(err.code, "DEPTH_ZERO_SELF_SIGNED_CERT", "client should throw exception");
                done();
            });
        });

        it("nativeApi Client Should successfully execute request", function (done) {
            var connectionPolicy = new DocumentBase.ConnectionPolicy();
            // Disable SSL verification explicitly
            connectionPolicy.DisableSSLVerification = true;
            var client = new DocumentDBClient(host, { masterKey: masterKey },
                connectionPolicy);

            // create database
            client.createDatabase({ id: Base.generateGuidId() }, function (err, db) {
                assert.equal(err, undefined, "error creating database");
                done();
            });
        });
    });
