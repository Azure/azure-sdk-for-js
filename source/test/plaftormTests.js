/*
The MIT License (MIT)
Copyright (c) 2014 Microsoft Corporation

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

var assert = require("assert")
    , Contants = require("../lib/constants")
    , os = require("os")
    , Platform = require("../lib/platform")
    , util = require("util");

describe("Platform.getUserAgent", function () {
    it("getUserAgent()", function () {
        var userAgent = Platform.getUserAgent();
        var expectedUserAgent = util.format("%s/%s Nodejs/%s documentdb-nodejs-sdk/%s",
            os.platform(), os.release(), process.version,
            Contants.SDKVersion
        );
        assert.strictEqual(userAgent, expectedUserAgent, "invalid UserAgent format");
    });

    describe("Platform._getSafeUserAgentSegmentInfo()", function () {
        it("Removing spaces", function () {
            var safeString = Platform._getSafeUserAgentSegmentInfo('a b    c');
            assert.strictEqual(safeString, 'abc');
        });
        it("empty string handling", function () {
            var safeString = Platform._getSafeUserAgentSegmentInfo('');
            assert.strictEqual(safeString, 'unknown');
        });
        it("undefined", function () {
            var safeString = Platform._getSafeUserAgentSegmentInfo(undefined);
            assert.strictEqual(safeString, 'unknown');
        });
        it("null", function () {
            var safeString = Platform._getSafeUserAgentSegmentInfo(null);
            assert.strictEqual(safeString, 'unknown');
        });
    });
});