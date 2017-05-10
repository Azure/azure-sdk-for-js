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

var Base = require("../lib/base"),
    assert = require("assert"),
    CollectionRoutingMap = require("../lib/routing/inMemoryCollectionRoutingMap"),
    SmartRoutingMapProvider = require("../lib/routing/smartRoutingMapProvider"),
    PartitionKeyRangeCache = require("../lib/routing/partitionKeyRangeCache");

var QueryRange = CollectionRoutingMap.QueryRange;
var CollectionRoutingMapFactory = CollectionRoutingMap.CollectionRoutingMapFactory;

describe("Smart Routing Map Provider OverlappingRanges", function () {

    var collectionLink = 'dbs/7JZZAA==/colls/7JZZAOS-JQA=/';
    var collectionId = 'my collection';
    var MockedQueryIterator = Base.defineClass(function (results) { this._results = results; },
        { toArray: function (callback) { callback(undefined, this._results); } });

    var MockedDocumentClient = Base.defineClass(function (partitionKeyRanges) { this._partitionKeyRanges = partitionKeyRanges; }, {
        readPartitionKeyRanges: function (collectionLink) {
            return new MockedQueryIterator(this._partitionKeyRanges);
        },
        getIdFromLink: function () {
            return collectionId;
        }
    });

    var partitionKeyRanges = [
        { 'id': '0', 'minInclusive': '', 'maxExclusive': '05C1C9CD673398' },
        { 'id': '1', 'minInclusive': '05C1C9CD673398', 'maxExclusive': '05C1D9CD673398' },
        { 'id': '2', 'minInclusive': '05C1D9CD673398', 'maxExclusive': '05C1E399CD6732' },
        { 'id': '3', 'minInclusive': '05C1E399CD6732', 'maxExclusive': '05C1E9CD673398' },
        { 'id': '4', 'minInclusive': '05C1E9CD673398', 'maxExclusive': 'FF' }];

    var mockedDocumentClient = new MockedDocumentClient(partitionKeyRanges);
    var smartRoutingMapProvider = new SmartRoutingMapProvider(mockedDocumentClient);
    var partitionKeyRangeCache = new PartitionKeyRangeCache(mockedDocumentClient);

    describe("Test Full Range", function () {

        it('query ranges: ["", ""FF)', function (done) {
            // query range is the whole partition key range
            var pkRange = new QueryRange("", "FF", true, false);
            validateOverlappingRanges([pkRange], partitionKeyRanges, done);
        });
        
        it('query ranges: ("", ""FF)', function (done) {
            // query range is the whole partition key range
            var pkRange = new QueryRange("", "FF", false, false);
            validateOverlappingRanges([pkRange], partitionKeyRanges, done);
        });
    });

    describe("Test Empty Range", function () {

        it('empty query range list', function (done) {
            // query range list is empty
            validateOverlappingRanges([], [], done);
        });

        it('query ranges: ("", ""]', function (done) {
            // validate the overlaping partition key ranges results for empty ranges is empty
            validateOverlappingRanges([new QueryRange("", "", false, true)], [], done);
        });

        it('query ranges: ("", "")', function (done) {
            // validate the overlaping partition key ranges results for empty ranges is empty
            validateOverlappingRanges([new QueryRange("", "", false, false)], [], done);
        });

        it('query ranges: ["", "")', function (done) {
            // validate the overlaping partition key ranges results for empty ranges is empty
            validateOverlappingRanges([new QueryRange("", "", true, false)], [], done);
        });
    });

    describe("Error Handling: Bad Overlapping Query Range", function () {

        it('overlapping query ranges (in a point)', function (done) {
            var r1 = new QueryRange("", "AA", true, true);
            var r2 = new QueryRange("AA", "FF", true, false);
            validateSmartOverlappingRanges([r1, r2], undefined, done, true);
        });

        it('overlapping query ranges (in a range)', function (done) {
            var r1 = new QueryRange("", "AB", true, false);
            var r2 = new QueryRange("AA", "FA", true, false);
            validateSmartOverlappingRanges([r1, r2], undefined, done, true);
        });

        it('not sorted query ranges', function (done) {
            var r1 = new QueryRange("AB", "AC", true, false);
            var r2 = new QueryRange("AA", "AB", true, false);
            validateSmartOverlappingRanges([r1, r2], undefined, done, true);
        });
    });

    it("Empty Ranges are thrown away", function (done) {
        var e1 = new QueryRange("", "", true, false)
        var r1 = new QueryRange("", "AB", true, false)
        var e2 = new QueryRange("AB", "AB", true, false)
        var r2 = new QueryRange("AB", "AC", true, false)
        var e3 = new QueryRange("AC", "AC", true, false)
        var e4 = new QueryRange("AD", "AD", true, false);
        assertOverlappingRangesAreEqual([e1, r1, e2, r2, e3, e4], [r1, r2], done);
    });

    it("Single Query Range", function (done) {
        var r = new QueryRange("AB", "AC", true, false)
        assertBothProvidersResultsEqual([r], done);
    });

    it("Multiple Query Ranges", function (done) {
        var ranges = [
            new QueryRange("0000000040", "0000000045", true, false),
            new QueryRange("0000000045", "0000000046", true, false),
            new QueryRange("0000000046", "0000000050", true, false)
        ]
        assertBothProvidersResultsEqual(ranges, done);
    });

    it("Single Boundary Case Query Range", function (done) {
        var ranges = [
            new QueryRange("05C1C9CD673398", "05C1D9CD673398", true, false)
        ];
        validateOverlappingRanges(ranges, partitionKeyRanges.slice(1, 2), done);
    });

    it("Two Adjacent Boundary Case Query Ranges", function (done) {
        var ranges = [
            // partitionKeyRanges[1]
            new QueryRange("05C1C9CD673398", "05C1D9CD673398", true, false),
            // partitionKeyRanges[2]
            new QueryRange("05C1D9CD673398", "05C1D9CD673399", true, false),
        ]
        validateOverlappingRanges(ranges, partitionKeyRanges.slice(1, 3), done);
    });

    it("Two Ranges in one partition key range", function (done) {
        var ranges = [
            // two ranges fall in the same partition key range
            new QueryRange("05C1C9CD673400", "05C1C9CD673401", true, false),
            new QueryRange("05C1C9CD673402", "05C1C9CD673403", true, false),
        ]
        validateOverlappingRanges(ranges, partitionKeyRanges.slice(1, 2), done);
    });

    it("Complex", function (done) {
        var ranges = [
            // all are covered by partitionKeyRanges[1]
            new QueryRange("05C1C9CD673398", "05C1D9CD673391", true, false),
            new QueryRange("05C1D9CD673391", "05C1D9CD673392", true, false),
            new QueryRange("05C1D9CD673393", "05C1D9CD673395", true, false),
            new QueryRange("05C1D9CD673395", "05C1D9CD673395", true, false),
            // all are covered by partitionKeyRanges[4]]
            new QueryRange("05C1E9CD673398", "05C1E9CD673401", true, false),
            new QueryRange("05C1E9CD673402", "05C1E9CD673403", true, false),
            // empty range
            new QueryRange("FF", "FF", true, false),
        ]
        validateOverlappingRanges(ranges, [partitionKeyRanges[1], partitionKeyRanges[4]], done);
    });

    // Validates the results
    // smartRoutingMapProvider.getOverlappingRanges()
    // partitionKeyRangeCache.getOverlappingRanges() is equal
    var assertBothProvidersResultsEqual = function (queryRanges, done) {
        var errorExpected = errorExpected || false;
        smartRoutingMapProvider.getOverlappingRanges(function (err1, results1) {
            partitionKeyRangeCache.getOverlappingRanges(function (err2, results2) {
                assert.equal(err1, err2);
                assert.deepEqual(results1, results2);
                done();
            }, collectionLink, queryRanges);
        }, collectionLink, queryRanges);
    }

    // Validates the results
    // smartRoutingMapProvider.getOverlappingRanges()
    // partitionKeyRangeCache.getOverlappingRanges() is as expected
    var validateOverlappingRanges = function (queryRanges, expectedResults, done, errorExpected) {
        var errorExpected = errorExpected || false;
        validateSmartOverlappingRanges(queryRanges, expectedResults,
            function () {
                validatePartitionKeyRangeCacheOverlappingRanges(queryRanges, expectedResults, done, errorExpected);
            }, errorExpected);
    }

    // Validates the results of both
    // smartRoutingMapProvider.getOverlappingRanges()
    // partitionKeyRangeCache.getOverlappingRanges() is the same for both queryRanges1, queryRanges2
    var assertOverlappingRangesAreEqual = function (queryRanges1, queryRanges2, done) {
        assertProviderOverlappingRangesAreEqual(smartRoutingMapProvider, queryRanges1, queryRanges2,
            function () {
                assertProviderOverlappingRangesAreEqual(partitionKeyRangeCache, queryRanges1, queryRanges2,
                    function () {
                        assertBothProvidersResultsEqual(queryRanges1, done);
                    }
                );
            });
    }

    // Validates the results
    // provider.getOverlappingRanges() is the same on both queryRanges1, queryRanges2
    var assertProviderOverlappingRangesAreEqual = function (provider, queryRanges1, queryRanges2, done) {
        var errorExpected = errorExpected || false;
        provider.getOverlappingRanges(function (err1, results1) {
            provider.getOverlappingRanges(function (err2, results2) {
                assert.equal(err1, err2);
                assert.deepEqual(results1, results2);
                done();
            }, collectionLink, queryRanges2);
        }, collectionLink, queryRanges1);
    }

    // Validates the results
    // provider.getOverlappingRanges() is as expected
    var validateProviderOverlappingRanges = function (provider, queryRanges, expectedResults, done, errorExpected) {
        var errorExpected = errorExpected || false;
        provider.getOverlappingRanges(function (err, results) {
            if (errorExpected) {
                assert.notEqual(err, undefined);
                assert.equal(results, undefined);
                done();
            } else {
                assert.equal(err, undefined, "unexpected error happened " + err);
                assert.deepEqual(results, expectedResults);
                done();
            }
        }, collectionLink, queryRanges);
    }

    // validates that the results of 
    // smartRoutingMapProvider.getOverlappingRanges() is as expected
    var validateSmartOverlappingRanges = function (queryRanges, expectedResults, done, errorExpected) {
        validateProviderOverlappingRanges(smartRoutingMapProvider, queryRanges, expectedResults, done, errorExpected);
    }

    // validates that the results of 
    // partitionKeyRangeCache.getOverlappingRanges() is as expected
    var validatePartitionKeyRangeCacheOverlappingRanges = function (queryRanges, expectedResults, done, errorExpected) {
        validateProviderOverlappingRanges(partitionKeyRangeCache, queryRanges, expectedResults, done, errorExpected);
    }
});
