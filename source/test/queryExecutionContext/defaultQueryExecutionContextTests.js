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

var Constants = require("../../lib/constants");
var DefaultQueryExecutionContext = require("../../lib/queryExecutionContext/defaultQueryExecutionContext");
var assert = require("assert");

describe("defaultQueryExecutionContext Tests", function () {
    var continuation = "next please";
    
    describe("When passing no continuation to the constructor", function () {
        var documentClient = null;
        var query = null;
        var options = null;
        var expectedPassedOptions = { continuation: undefined };
        
        describe("and no continuation is returned", function () {
            var fetchFunction = function (opts, cb) {
                assert.ok(cb, "callback is null or undefined");
                assert.deepEqual(opts, expectedPassedOptions, "options object does not match");

                cb(null, null, {});
            };

            var sut = new DefaultQueryExecutionContext(documentClient, query, options, fetchFunction);
            var currentPartitionIndex = sut.currentPartitionIndex;

            assert.equal(sut.continuation, null, "passed continuation does not match");

            sut.fetchMore(function (err, res, responseHeaders) {
                it("should pass no error to the callback", function () {
                    assert.equal(err, null, "Unexpected error received");
                });

                it("should pass no result to the callback", function () {
                    assert.equal(res, null, "Unexpected result received");
                });

                it("should pass an empty responseHeaders object to the callback", function () {
                    assert.deepEqual(responseHeaders, {}, "responseHeaders object is not empty");
                });

                it("should increment the currentPartitionIndex", function () {
                    assert.equal(sut.currentPartitionIndex, currentPartitionIndex + 1, "currentPartitionIndex does not match");
                });

                it("should leave the continuation at undefined", function () {
                    assert.equal(sut.continuation, undefined, "continuation is not undefined");
                });
            });
        });

        describe("and a continuation is returned", function () {
            var expectedResponseHeaders = {};
            expectedResponseHeaders[Constants.HttpHeaders.Continuation] = continuation;

            var fetchFunction = function (opts, cb) {
                assert.ok(cb, "callback is null or undefined");
                assert.deepEqual(opts, expectedPassedOptions, "options object does not match");

                cb(null, null, expectedResponseHeaders);
            };

            var sut = new DefaultQueryExecutionContext(documentClient, query, options, fetchFunction);
            var currentPartitionIndex = sut.currentPartitionIndex;

            assert.equal(sut.continuation, null, "passed continuation does not match");

            sut.fetchMore(function (err, res, responseHeaders) {
                it("should pass no error to the callback", function () {
                    assert.equal(err, null, "Unexpected error received");
                });

                it("should pass no result to the callback", function () {
                    assert.equal(res, null, "Unexpected result received");
                });

                it("should pass an empty responseHeaders object to the callback", function () {
                    assert.deepEqual(responseHeaders, expectedResponseHeaders, "responseHeaders do not match");
                });

                it("should not increment the currentPartitionIndex", function () {
                    assert.equal(sut.currentPartitionIndex, currentPartitionIndex, "currentPartitionIndex does not match");
                });

                it("should set the continuation to the response header value", function () {
                    assert.equal(sut.continuation, continuation, "continuation does not match");
                });
            });
        });
    });

    describe("When passing a continuation to the constructor", function () {
        var documentClient = null;
        var query = null;
        var options = { continuation: continuation };
        
        describe("and no continuation is returned", function () {
            var fetchFunction = function (opts, cb) {
                assert.ok(cb, "callback is null or undefined");
                assert.deepEqual(opts, options, "options object does not match");

                cb(null, null, {});
            };

            var sut = new DefaultQueryExecutionContext(documentClient, query, options, fetchFunction);
            var currentPartitionIndex = sut.currentPartitionIndex;

            assert.equal(sut.continuation, continuation, "passed continuation does not match");

            sut.fetchMore(function (err, res, responseHeaders) {
                it("should pass no error to the callback", function () {
                    assert.equal(err, null, "Unexpected error received");
                });

                it("should pass no result to the callback", function () {
                    assert.equal(res, null, "Unexpected result received");
                });

                it("should pass an empty responseHeaders object to the callback", function () {
                    assert.deepEqual(responseHeaders, {}, "responseHeaders object is not empty");
                });

                it("should increment the currentPartitionIndex", function () {
                    assert.equal(sut.currentPartitionIndex, currentPartitionIndex + 1, "currentPartitionIndex does not match");
                });

                it("should set the continuation to undefined", function () {
                    assert.equal(sut.continuation, undefined, "continuation is not undefined");
                });
            });
        });

        describe("and a continuation is returned", function () {
            var nextContinuation = "last one";
            var expectedResponseHeaders = {};
            expectedResponseHeaders[Constants.HttpHeaders.Continuation] = nextContinuation;

            var fetchFunction = function (opts, cb) {
                assert.ok(cb, "callback is null or undefined");
                assert.deepEqual(opts, options, "options object does not match");

                cb(null, null, expectedResponseHeaders);
            };

            var sut = new DefaultQueryExecutionContext(documentClient, query, options, fetchFunction);
            var currentPartitionIndex = sut.currentPartitionIndex;

            assert.equal(sut.continuation, continuation, "passed continuation does not match");

            sut.fetchMore(function (err, res, responseHeaders) {
                it("should pass no error to the callback", function () {
                    assert.equal(err, null, "Unexpected error received");
                });

                it("should pass no result to the callback", function () {
                    assert.equal(res, null, "Unexpected result received");
                });

                it("should pass the expected responseHeaders object to the callback", function () {
                    assert.deepEqual(responseHeaders, expectedResponseHeaders, "responseHeaders do not match");
                });

                it("should not increment the currentPartitionIndex", function () {
                    assert.equal(sut.currentPartitionIndex, currentPartitionIndex, "currentPartitionIndex does not match");
                });

                it("should set the continuation to the response header value", function () {
                    assert.equal(sut.continuation, nextContinuation, "continuation does not match");
                });
            });
        });
    });
});