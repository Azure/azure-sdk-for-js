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
    testConfig = require("./_testConfig"),
    assert = require("assert");

var DocumentClient = lib.DocumentClient,
    Constants = lib.Constants;

describe("DocumentClient Tests", function () {
    var host = testConfig.host;
    var masterKey = testConfig.masterKey;
    var client = new DocumentClient(host, { masterKey: masterKey });

    describe("setIsUpsertHeader", function () {
        it("Should add is-upsert header.", function (done) {
            var headers = client.defaultHeaders;
            assert.equal(undefined, headers[Constants.HttpHeaders.IsUpsert]);
            client.setIsUpsertHeader(headers);
            assert.equal(true, headers[Constants.HttpHeaders.IsUpsert]);
            done();
        });

        it("Should update is-upsert header.", function (done) {
            var headers = {};
            headers[Constants.HttpHeaders.IsUpsert] = false;
            assert.equal(false, headers[Constants.HttpHeaders.IsUpsert]);
            client.setIsUpsertHeader(headers);
            assert.equal(true, headers[Constants.HttpHeaders.IsUpsert]);
            done();
        });

        it("Should throw on undefined headers", function (done) {
            assert.throws(
                function () { client.setIsUpsertHeader(); },
                /The "headers" parameter must not be null or undefined/
            );
            done();
        });

        it("Should throw on null headers", function (done) {
            assert.throws(
                function () { client.setIsUpsertHeader(null); },
                /The "headers" parameter must not be null or undefined/
            );
            done();
        });

        it("Should throw on invalid string headers", function (done) {
            assert.throws(
                function () { client.setIsUpsertHeader(""); },
                /The "headers" parameter must be an instance of "Object". Actual type is: "string"./
            );
            done();
        });

        it("Should throw on invalid number headers", function (done) {
            assert.throws(
                function () { client.setIsUpsertHeader(0); },
                /The "headers" parameter must be an instance of "Object". Actual type is: "number"./
            );
            done();
        });

        it("Should throw on invalid boolean headers", function (done) {
            assert.throws(
                function () { client.setIsUpsertHeader(false); },
                /The "headers" parameter must be an instance of "Object". Actual type is: "boolean"./
            );
            done();
        });
    });

    //we are using util.format function instead.
    describe.skip("sprintf", function () {
        it("0 strings", function (done) {
            assert.equal("foo", client.sprintf("foo"));
            done();
        });

        it("1 string", function (done) {
            assert.equal("foo", client.sprintf("%s", "foo"));
            done();
        });

        it("2 strings", function (done) {
            assert.equal("foobar", client.sprintf("%s%s", "foo", "bar"));
            done();
        });

        it("3 strings", function (done) {
            assert.equal("foobarbaz", client.sprintf("%s%s%s", "foo", "bar", "baz"));
            done();
        });

        it("%% escapes", function (done) {
            assert.equal('%s', client.sprintf("%%s", 'foo'));
            done();
        });
    });

    describe("validateOptionsAndCallback Unit Tests", function () {
        it("no parameters", function (done) {
            var result = client.validateOptionsAndCallback();

            assert.notEqual(null, result.options);
            assert.equal("object", typeof result.options);

            assert.equal(undefined, result.callback);
            done();
        });

        it("options", function (done) {
            var result = client.validateOptionsAndCallback({});

            assert.notEqual(null, result.options);
            assert.equal("object", typeof result.options);

            assert.equal(undefined, result.callback);
            done();
        });

        it("callback", function (done) {
            var result = client.validateOptionsAndCallback(function () { });
            assert.notEqual(null, result.options);
            assert.equal("object", typeof result.options);

            assert.equal("function", typeof result.callback);
            done();
        });

        it("options, callback.", function (done) {
            var result = client.validateOptionsAndCallback({}, function () { });
            assert.notEqual(null, result.options);
            assert.equal("object", typeof result.options);

            assert.equal("function", typeof result.callback);
            done();
        });

        it("undefined, callback", function (done) {
            var result = client.validateOptionsAndCallback(undefined, function () { });
            assert.notEqual(null, result.options);
            assert.equal("object", typeof result.options);

            assert.equal("function", typeof result.callback);
            done();
        });

        it("null, callback", function (done) {
            var result = client.validateOptionsAndCallback(null, function () { });
            assert.equal(null, result.options);
            assert.equal("object", typeof result.options);

            assert.equal("function", typeof result.callback);
            done();
        });


        it("invalid string options", function (done) {
            assert.throws(
                function () { client.validateOptionsAndCallback("foo", function () { }); },
                /The "options" parameter must be of type "object". Actual type is: "string"/
            );
            done();
        });

        it("invalid number options", function (done) {
            assert.throws(
                function () { client.validateOptionsAndCallback(0, function () { }); },
                /The "options" parameter must be of type "object". Actual type is: "number"/
            );
            done();
        });

        it("invalid bool options", function (done) {
            assert.throws(
                function () { client.validateOptionsAndCallback(false, function () { }); },
                /The "options" parameter must be of type "object". Actual type is: "boolean"/
            );
            done();
        });

        it("invalid string callback", function (done) {
            assert.throws(
                function () { client.validateOptionsAndCallback({}, "bar"); },
                /The "callback" parameter must be of type "function". Actual type is: "string"/
            );
            done();
        });

        it("invalid number callback", function (done) {
            assert.throws(
                function () { client.validateOptionsAndCallback({}, 0); },
                /The "callback" parameter must be of type "function". Actual type is: "number"/
            );
            done();
        });

        it("invalid boolean callback", function (done) {
            assert.throws(
                function () { client.validateOptionsAndCallback({}, false); },
                /The "callback" parameter must be of type "function". Actual type is: "boolean"/
            );
            done();
        });

        it("invalid options, invalid callback", function (done) {
            assert.throws(
                function () { client.validateOptionsAndCallback("foo", "bar"); },
                /The "options" parameter must be of type "object". Actual type is: "string"/
            );
            done();
        });
    });

    describe("isResourceValid Unit Tests", function () {
        it("id is not string", function (done) {
            var err = {};
            var result = client.isResourceValid({id: 1}, err);

            assert.equal(result, false);
            assert.deepEqual(err, {"message": "Id must be a string."});
            done();
        });
    });

    describe("extractPartitionKey", function() {
        var document, partitionKeyDefinition;

        beforeEach(function() {
            document = undefined;
            partitionKeyDefinition = undefined;
        });

        describe("With undefined partitionKeyDefinition", function() {
            it("should return undefined", function() {
                var document = {};
                var result = client.extractPartitionKey(document, partitionKeyDefinition);
                assert.equal(result, undefined);
            });
        });

        describe("With a defined partitionKeyDefinition", function() {
            beforeEach(function() {
                partitionKeyDefinition = { paths: ["/a/b"] }
            });

            it("should return [{}] when document has no partition key value", function() {
                var document = {};
                var result = client.extractPartitionKey(document, partitionKeyDefinition);
                assert.deepEqual(result, [{}]);
            });

            it("should return [null] when document has a null partition key value", function() {
                var document = { a: { b: null } };
                var result = client.extractPartitionKey(document, partitionKeyDefinition);
                assert.deepEqual(result, [null]);
            });

            it("should return [{}] when document has a partially defined partition key value", function() {
                var document = { a: "some value" };
                var result = client.extractPartitionKey(document, partitionKeyDefinition);
                assert.deepEqual(result, [{}]);
            });

            it("should return [value] when document has a valid partition key value", function() {
                var document = { a: { b: "some value" } };
                var result = client.extractPartitionKey(document, partitionKeyDefinition);
                assert.deepEqual(result, ["some value"]);
            });
        });
    });

});