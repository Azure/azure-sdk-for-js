//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

"use strict";

var ConsistentHashRing = require("../lib/Hash/consistentHashRing").ConsistentHashRing;
var assert = require("assert");

describe("ConsistentHashRing._constructPartitions tests", function () {
	var test = function (options, expected) {
		var partitions = ConsistentHashRing._constructPartitions(options);
		assert.equal(JSON.stringify(partitions), JSON.stringify(expected));
	};
	
	it("_constructPartitions()", function () {
		var options = {
			nodes: ["A", "AB"],
			totalPartitions: 2,
			hashGenerator: {
				computeHash: function (preImage) {
					return [1];
				}
			}
		};
		var expected = [
			{ "hashValue": [1], "node": "A" }, 
			{ "hashValue": [1], "node": "AB" }
		];
		
		test(options, expected);
	});
});

describe("ConsistentHashRing._areEqual tests", function () {
	var test = function (a, b, expected) {
		assert.strictEqual(ConsistentHashRing._areEqual(a, b), expected);
	};
	
	it("_areEqual() is false", function () { test([1], [2], false); });
	it("_areEqual() is true", function () { test([1], [1], true); });
});


describe("ConsistentHashRing._findPartition tests", function () {
	var test = function (node, expected) {
		var options = {
			nodes: ["A", "AB"],
			totalPartitions: 100,
			hashGenerator: {
				computeHash: function (preImage) {
					return [preImage.length % 256];
				}
			}
		};
		var ring = new ConsistentHashRing(options);
		var partition = ring._findPartition(node);
		var found = partition < ring.totalPartitions;
		assert.strictEqual(found, expected, "partition:" + partition);
	};
	
	it("_findPartition(A)", function () { test("A", true); });
	it("_findPartition(AB)", function () { test("AB", true); });
	it("_findPartition(ABC)", function () { test("ABC", false); });
});

describe("ConsistentHashRing.getNode tests", function () {
	var test = function (node, expected) {
		var options = {
			nodes: ["A", "AB"],
			totalPartitions: 100,
			hashGenerator: {
				computeHash: function (preImage) {
					return [preImage.length % 256];
				}
			}
		};
		var ring = new ConsistentHashRing(options);
		var node = ring.getNode(node);
		assert.strictEqual(node, expected);
	};
	
	it("getNode(A)", function () { test("A", "A"); });
	it("getNode(AB)", function () { test("AB", "AB"); });
	it("getNode(ABC)", function () { test("ABC", null); });
});
