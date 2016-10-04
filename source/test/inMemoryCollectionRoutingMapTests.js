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

var assert = require("assert"),
    CollectionRoutingMap = require("../lib/routing/inMemoryCollectionRoutingMap"),
    _ = require("underscore");

var QueryRange = CollectionRoutingMap.QueryRange;
var CollectionRoutingMapFactory = CollectionRoutingMap.CollectionRoutingMapFactory;

describe("InMemoryCollectionRoutingMap Tests", function () {
    
    describe("getOverlappingRanges", function () {

        var partitionKeyRanges = [{ 'id': '0', 'minInclusive': '', 'maxExclusive': '05C1C9CD673398' }, { 'id': '1', 'minInclusive': '05C1C9CD673398', 'maxExclusive': '05C1D9CD673398' }, { 'id': '2', 'minInclusive': '05C1D9CD673398', 'maxExclusive': '05C1E399CD6732' }, { 'id': '3', 'minInclusive': '05C1E399CD6732', 'maxExclusive': '05C1E9CD673398' }, { 'id': '4', 'minInclusive': '05C1E9CD673398', 'maxExclusive': 'FF' }]
        var partitionRangeWithInfo = partitionKeyRanges.map(function (r) { return [r, true]; });
        var collectionRoutingMap = CollectionRoutingMapFactory.createCompleteRoutingMap(partitionRangeWithInfo, 'sample collection id');
        
        it("queryCompleteRange", function () {
            var completeRange = new QueryRange("", "FF", true, false);
            var overlappingPartitionKeyRanges = collectionRoutingMap.getOverlappingRanges(completeRange);

            assert.equal(overlappingPartitionKeyRanges.length, partitionKeyRanges.length)
            assert.deepEqual(overlappingPartitionKeyRanges, partitionKeyRanges)
        });

        it("queryEmptyRange", function () {
            var emtpyRange = new QueryRange("05C1C9CD673396", "05C1C9CD673396", true, false);
            var overlappingPartitionKeyRanges = collectionRoutingMap.getOverlappingRanges(emtpyRange);

            assert.equal(overlappingPartitionKeyRanges.length, 0)
        });

        it("queryPoint", function () {
            var pointRange = new QueryRange("05C1D9CD673397", "05C1D9CD673397", true, true);
            var overlappingPartitionKeyRanges = collectionRoutingMap.getOverlappingRanges(pointRange);

            assert.equal(overlappingPartitionKeyRanges.length, 1);
            assert(overlappingPartitionKeyRanges[0].minInclusive <= pointRange.min);
            assert(overlappingPartitionKeyRanges[0].maxExclusive > pointRange.max);
        });

        it("boundaryPointQuery", function () {
            var pointRange = new QueryRange("05C1C9CD673398", "05C1C9CD673398", true, true);
            var overlappingPartitionKeyRanges = collectionRoutingMap.getOverlappingRanges(pointRange);

            assert.equal(overlappingPartitionKeyRanges.length, 1);
            assert(overlappingPartitionKeyRanges[0].minInclusive <= pointRange.min);
            assert(overlappingPartitionKeyRanges[0].maxExclusive > pointRange.max);
            assert(overlappingPartitionKeyRanges[0].minInclusive === pointRange.min);
        });
    });

    describe("All methods", function () {
        var partitionRangeWithInfo =
            [
                [{
                    id: "2",
                    minInclusive: "0000000050",
                    maxExclusive: "0000000070"
                }, 2],
                [{
                    id: "0",
                    minInclusive: "",
                    maxExclusive: "0000000030"
                }, 0],
                [{
                    id: "1",
                    minInclusive: "0000000030",
                    maxExclusive: "0000000050"
                }, 1],
                [{
                    id: "3",
                    minInclusive: "0000000070",
                    maxExclusive: "FF"
                }, 3]
            ];

        var collectionRoutingMap = CollectionRoutingMapFactory.createCompleteRoutingMap(partitionRangeWithInfo, 'sample collection id');

        it("validate _orderedPartitionKeyRanges", function () {
            assert.equal("0", collectionRoutingMap.getOrderedParitionKeyRanges()[0].id)
            assert.equal("1", collectionRoutingMap.getOrderedParitionKeyRanges()[1].id)
            assert.equal("2", collectionRoutingMap.getOrderedParitionKeyRanges()[2].id)
            assert.equal("3", collectionRoutingMap.getOrderedParitionKeyRanges()[3].id)
        });

        it("validate _orderedPartitionInfo", function () {
            assert.equal(0, collectionRoutingMap._orderedPartitionInfo[0])
            assert.equal(1, collectionRoutingMap._orderedPartitionInfo[1])
            assert.equal(2, collectionRoutingMap._orderedPartitionInfo[2])
            assert.equal(3, collectionRoutingMap._orderedPartitionInfo[3])
        });

        it("validate getRangeByEffectivePartitionKey", function () {
            assert.equal("0", collectionRoutingMap.getRangeByEffectivePartitionKey("").id)
            assert.equal("0", collectionRoutingMap.getRangeByEffectivePartitionKey("0000000000").id)
            assert.equal("1", collectionRoutingMap.getRangeByEffectivePartitionKey("0000000030").id)
            assert.equal("1", collectionRoutingMap.getRangeByEffectivePartitionKey("0000000031").id)
            assert.equal("3", collectionRoutingMap.getRangeByEffectivePartitionKey("0000000071").id)
        });

        it("validate getRangeByPartitionKeyRangeId", function () {
            assert.equal("0", collectionRoutingMap.getRangeByPartitionKeyRangeId("0").id)
            assert.equal("1", collectionRoutingMap.getRangeByPartitionKeyRangeId("1").id)
        });

        it("validate getOverlappingRanges", function () {
            var completeRange = new QueryRange("", "FF", true, false);

            var overlappingRanges = collectionRoutingMap.getOverlappingRanges([completeRange])
            assert.equal(4, overlappingRanges.length)

            var onlyParitionRanges = partitionRangeWithInfo.map(function (item) { return item[0]; });
            var getKey = function (r) {
                return r['id'];
            };
            onlyParitionRanges = _.sortBy(onlyParitionRanges, getKey);
            assert.deepEqual(overlappingRanges, onlyParitionRanges)

            var noPoint = new QueryRange("", "", false, false)
            assert.equal(0, collectionRoutingMap.getOverlappingRanges([noPoint]).length);

            var onePoint = new QueryRange("0000000040", "0000000040", true, true)
            var overlappingPartitionKeyRanges = collectionRoutingMap.getOverlappingRanges([onePoint]);
            assert.equal(1, overlappingPartitionKeyRanges.length)
            assert.equal("1", overlappingPartitionKeyRanges[0].id)

            var ranges = [
                new QueryRange("0000000040", "0000000045", true, true),
                new QueryRange("0000000045", "0000000046", true, true),
                new QueryRange("0000000046", "0000000050", true, true)
            ]
            var overlappingPartitionKeyRanges = collectionRoutingMap.getOverlappingRanges(ranges);

            assert.equal(2, overlappingPartitionKeyRanges.length)
            assert.equal("1", overlappingPartitionKeyRanges[0].id)
            assert.equal("2", overlappingPartitionKeyRanges[1].id)
        });

    });
    
    describe("Error Handling", function () {

        describe("Incorrect instantiation", function () {

            it("Invalid Routing Map", function () {
                var partitionRangeWithInfo =
                    [
                        [{ 'id': "1", 'minInclusive': "0000000020", 'maxExclusive': "0000000030" }, 2],
                        [{ 'id': "2", 'minInclusive': "0000000025", 'maxExclusive': "0000000035" }, 2],
                    ];
                var collectionUniqueId = ""
                try {
                    var collectionRoutingMap = CollectionRoutingMapFactory.createCompleteRoutingMap(partitionRangeWithInfo, 'sample collection id');
                    assert.fail("must throw exception");
                } catch (e) {
                    assert.equal(e.message, "Ranges overlap");
                }
            });

            it("Incomplete Routing Map", function () {
                var partitionRangeWithInfo =
                    [
                        [{ 'id': "2", 'minInclusive': "", 'maxExclusive': "0000000030" }, 2],
                        [{ 'id': "3", 'minInclusive': "0000000031", 'maxExclusive': "FF" }, 2],
                    ];
                var collectionRoutingMap = CollectionRoutingMapFactory.createCompleteRoutingMap(partitionRangeWithInfo, 'sample collection id');
                assert.equal(collectionRoutingMap, null);
                
                partitionRangeWithInfo = [
                    [{ 'id': "2", 'minInclusive': "", 'maxExclusive': "0000000030" }, 2],
                    [{ 'id': "2", 'minInclusive': "0000000030", 'maxExclusive': "FF" }, 2],
                ]
                var collectionRoutingMap = CollectionRoutingMapFactory.createCompleteRoutingMap(partitionRangeWithInfo, 'sample collection id');
                assert.notEqual(collectionRoutingMap, null);
            });
        });
    });
});
