//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

"use strict";

var ConsistentHashRing = require("../lib/Hash/consistentHashRing").ConsistentHashRing;
var assert = require("assert");

describe("ConsistentHashRing._constructPartitions tests", function () {
	var test = function (nodes, options, expected) {
		var partitions = ConsistentHashRing._constructPartitions(nodes, options);
		assert.equal(JSON.stringify(partitions), JSON.stringify(expected));
	};
	
	it("_constructPartitions()", function () {
		var nodes = ["A", "AB"];
		var options = {
			numberOfVirtualNodesPerCollection: 1,
			computeHash: function (preImage) {
				return [1];
			}
		};
		var expected = [
			{ "hashValue": [1], "node": "A" }, 
			{ "hashValue": [1], "node": "AB" }
		];
		
		test(nodes, options, expected);
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
		var nodes = ["A", "AB"];
		var options = {
			numberOfVirtualNodesPerCollection: 50,
			computeHash: function (preImage) {
				return [preImage.length % 256];
			}
		};
		var ring = new ConsistentHashRing(nodes, options);
		var hash = options.computeHash(node);
		var partition = ring._findPartition(hash);
		var found = partition < options.numberOfVirtualNodesPerCollection * nodes.length;
		assert.strictEqual(found, expected, "partition:" + partition);
	};
	
	it("_findPartition(A)", function () { test("A", true); });
	it("_findPartition(AB)", function () { test("AB", true); });
	it("_findPartition(ABC)", function () { test("ABC", false); });
});

describe("ConsistentHashRing.getNode tests", function () {
	var test = function (node, expected) {
		var nodes= ["A", "AB"];
		var options = {
			numberOfVirtualNodesPerCollection: 50,
			computeHash: function (preImage) {
				return [preImage.length % 256];
			}
		};
		var ring = new ConsistentHashRing(nodes, options);
		var node = ring.getNode(node);
		assert.strictEqual(node, expected);
	};
	
	it("getNode(A)", function () { test("A", "A"); });
	it("getNode(AB)", function () { test("AB", "AB"); });
	it("getNode(ABC)", function () { test("ABC", null); });
});
