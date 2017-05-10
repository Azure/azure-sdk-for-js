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

var Range = lib.Range,
    RangePartitionResolver = lib.RangePartitionResolver;

describe("RangePartitionResolver", function () {
    describe("constructor", function () {
        it("missing partitionKeyExtractor throws", function (done) {
            var expetcedError = /Error: partitionKeyExtractor cannot be null or undefined/;

            assert.throws(
                function () {
                    var r = new RangePartitionResolver();
                },
                    expetcedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver(undefined);
                },
                    expetcedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver(null);
                },
                    expetcedError
            );

            done();
        });

        it("invalid partitionKeyExtractor throws", function (done) {
            var expetcedError = /partitionKeyExtractor must be either a 'string' or a 'function'/;

            assert.throws(
                function () {
                    var r = new RangePartitionResolver(0);
                },
                    expetcedError
            );

            assert.throws(
                function () {
                    var r = RangePartitionResolver(true);
                },
                    expetcedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver(NaN);
                },
                    expetcedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver([]);
                },
                    expetcedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver({});
                },
                    expetcedError
            );


            done();
        });

        it("missing partitionKeyMap throws", function (done) {
            var expectedError = /Error: partitionKeyMap cannot be null or undefined/;

            assert.throws(
                function () {
                    var r = new RangePartitionResolver("");
                },
                    expectedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver(function () {
                    });
                },
                    expectedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver("", null);
                },
                    expectedError
            );

            done();
        });

        it("invalid partitionKeyMap throws", function (done) {
            var expectedError = /Error: partitionKeyMap has to be an Array/;

            assert.throws(
                function () {
                    var r = new RangePartitionResolver("", 0);
                },
                    expectedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver("", "");
                },
                    expectedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver("", true);
                },
                    expectedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver("", NaN);
                },
                    expectedError
            );

            assert.throws(
                function () {
                    var r = new RangePartitionResolver("", {});
                },
                    expectedError
            );

            var r = new RangePartitionResolver("", new Array());
            done();
        });

        it("valid RangePartitionResolver", function (done) {
            var resolver = new RangePartitionResolver("", []);
            assert(resolver);
            assert.strictEqual(resolver.partitionKeyExtractor, "");
            assert.deepEqual(resolver.partitionKeyMap, []);
            done();
        });
    });

    describe("_getFirstContainingMapEntryOrNull", function () {
        it("_getFirstContainingMapEntryOrNull - empty map returns null", function (done) {
            var ranges = [undefined, null, 0, "", true, [], {}, NaN, new Range()];
            var resolver = new RangePartitionResolver("", []);
            ranges.forEach(function (r) {
                var result = resolver._getFirstContainingMapEntryOrNull(r);
                assert.equal(result, null);
            });
            done();
        });

        it("_tryGetContainingRange - map with no containing entry returns null", function (done) {
            var mapEntry = { range: new Range({ low: "A" }), link: "link1" };
            var resolver = new RangePartitionResolver("key", [mapEntry]);
            var result = resolver._getFirstContainingMapEntryOrNull(new Range({ low: "B" }));
            assert.equal(result, null);
            done();
        });

        it("_tryGetContainingRange - map with single containing entry returns entry", function (done) {
            var mapEntry = { range: new Range(), link: "link1" };
            var resolver = new RangePartitionResolver("key", [mapEntry]);
            var result = resolver._getFirstContainingMapEntryOrNull(new Range());
            assert.deepEqual(result, { range: new Range(), link: "link1" });
            done();
        });

        it("_tryGetContainingRange - map with more multiple containing entries returns first entry", function (done) {
            var map1 = [
                { range: new Range({ low: "A", high: "B" }), link: "link1" },
                { range: new Range({ low: "A" }), link: "link2" }
            ];

            var resolver1 = new RangePartitionResolver("key", map1);
            var result1 = resolver1._getFirstContainingMapEntryOrNull(new Range({ low: "A" }));
            assert.strictEqual(result1.link, "link1");

            var map2 = [
                { range: new Range({ low: "A" }), link: "link2" },
                { range: new Range({ low: "A", high: "Z" }), link: "link1" }
            ];

            var resolver2 = new RangePartitionResolver("key", map2);
            var result2 = resolver2._getFirstContainingMapEntryOrNull(new Range({ low: "A" }));
            assert.strictEqual(result2.link, "link2");
            done();
        });
    });

    describe("resolveForCreate", function () {
        it("_tryGetContainingRange - map containing parition key returns corresponding link", function (done) {
            var resolver = new RangePartitionResolver("key", [
                { range: new Range({ low: "A", high: "M" }), link: "link1" },
                { range: new Range({ low: "N", high: "Z" }), link: "link2" }
            ]);
            var result = resolver.resolveForCreate("X");
            assert.strictEqual(result, "link2");
            done();
        });

        it("_tryGetContainingRange - map not containing parition key throws", function (done) {
            var resolver = new RangePartitionResolver("key", [
                { range: new Range({ low: "A", high: "M" }), link: "link1" }
            ]);

            assert.throws(
                function () {
                    var result = resolver.resolveForCreate("X");
                },
                    /Error: Invalid operation: A containing range for 'X,X' doesn't exist in the partition map./
            );
            done();
        });
    });

    var resolveForReadTest = function (resolver, partitionKey, expectedLinks) {
        var result = resolver.resolveForRead(partitionKey);
        assert.deepEqual(expectedLinks, result);
    };

    describe("resolveForRead", function () {
        var resolver = new RangePartitionResolver(
            function (doc) {
                return doc.key;
            },
            [
                {
                    range: new Range({ low: "A", high: "M" }),
                    link: "link1"
                },
                {
                    range: new Range({ low: "N", high: "Z" }),
                    link: "link2"
                }
            ]);

        it("undefined", function (done) {
            var partitionKey = undefined;
            var expectedLinks = ["link1", "link2"];
            resolveForReadTest(resolver, partitionKey, expectedLinks);
            done();
        });

        it("null", function (done) {
            var partitionKey = null;
            var expectedLinks = ["link1", "link2"];
            resolveForReadTest(resolver, partitionKey, expectedLinks);
            done();
        });
    });

    describe("resolveForRead string", function () {
        var resolver = new RangePartitionResolver(
            function (doc) {
                return doc.key;
            },
                [
                {
                    range: new Range({ low: "A", high: "M" }),
                    link: "link1"
                },
                {
                    range: new Range({ low: "N", high: "Z" }),
                    link: "link2"
                }
            ]);

        it("point", function (done) {
            var partitionKey = new Range({ low: "D" });
            var expectedLinks = ["link1"];
            resolveForReadTest(resolver, partitionKey, expectedLinks);

            var partitionKey2 = new Range({ low: "Q" });
            var expectedLinks2 = ["link2"];
            resolveForReadTest(resolver, partitionKey2, expectedLinks2);
            done();
        });

        it("range", function (done) {
            var partitionKey = new Range({ low: "D", high: "Q" });
            var expectedLinks = ["link1", "link2"];
            resolveForReadTest(resolver, partitionKey, expectedLinks);
            done();
        });

        it("array of ranges", function (done) {
            var partitionKey = [
                new Range({ low: "A", high: "B" }),
                new Range({ low: "Q" })
            ];
            var expectedLinks = ["link1", "link2"];
            resolveForReadTest(resolver, partitionKey, expectedLinks);
            done();
        });
    });

    describe("resolveForRead number", function () {
        var partitionKeyExtractor = function (doc) {
            return doc.key;
        };

        var partitionKeyMap = [
            {
                range: new Range({ low: 1, high: 15 }),
                link: "link1"
            },
            {
                range: new Range({ low: 16, high: 30 }),
                link: "link2"
            }
        ];

        it("point, default compareFunction", function (done) {
            var resolver = new RangePartitionResolver(partitionKeyExtractor, partitionKeyMap);

            var partitionKey = new Range({ low: 2 });
            var expectedLinks = ["link2"];

            resolveForReadTest(resolver, partitionKey, expectedLinks);
            done();
        });

        it("point, custom compareFunction", function (done) {
            var resolver = new RangePartitionResolver(partitionKeyExtractor, partitionKeyMap, function (a, b) {
                return a - b;
            });

            var partitionKey = new Range({ low: 2 });
            var expectedLinks = ["link1"];

            resolveForReadTest(resolver, partitionKey, expectedLinks);
            done();
        });
    });

    describe("compareFunction", function () {
        var invalidCompareFunctionTest = function (compareFunction, done) {
            assert.throws(
                function () {
                    var resolver = new RangePartitionResolver(
                        "key",
                        [{ range: new Range({ low: "A" }), link: "link1" }],
                        compareFunction
                    );
                },
                    /Invalid argument: 'compareFunction' is not a function/);
            done();
        }

        it("invalid compareFunction - null", function (done) {
            var compareFunction = null;
            invalidCompareFunctionTest(compareFunction, done);
        });

        it("invalid compareFunction - string", function (done) {
            var compareFunction =  "";
            invalidCompareFunctionTest(compareFunction, done);
        });

        it("invalid compareFunction - number", function (done) {
            var compareFunction = 0;
            invalidCompareFunctionTest(compareFunction, done);
        });

        it("invalid compareFunction - boolean", function (done) {
            var compareFunction = false;
            invalidCompareFunctionTest(compareFunction, done);
        });

        it("invalid compareFunction - object", function (done) {
            var compareFunction = {};
            invalidCompareFunctionTest(compareFunction, done);
        });

        it("compareFunction throws", function (done) {
            var resolver = new RangePartitionResolver(
                "key",
                [{ range: new Range({ low: "A" }), link: "link1" }],
                function (a, b) { throw new Error("Compare error"); }
            );

            assert.throws(
                function () {
                    var result = resolver.resolveForRead("A", ["link1"]);
                },
                    /Error: Compare error/);
            done();
        });
    });
});
