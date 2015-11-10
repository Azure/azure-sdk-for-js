//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

"use strict";

var assert = require("assert");
var ConsistentHashRing = require("../lib/Hash/consistentHashRing").ConsistentHashRing;
var MurmurHash = require("../lib/Hash/murmurHash").MurmurHash;

describe("new ConsistentHashRing()", function () {
	it("not throws", function () {
		assert.doesNotThrow(
			function () {
				var ring = new ConsistentHashRing([]);
			}
		);
	});
	
	it("throws", function () {
		assert.throws(
			function () {
				var ring = new ConsistentHashRing();
			},
			/Invalid argument: 'nodes' has to be an array./
		);
	});
});

describe("ConsistentHashRing.getNode", function () {
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
	
	it("A is found", function () { test("A", "A"); });
	it("AB is found", function () { test("AB", "AB"); });
	it("ABC is not found", function () { test("ABC", null); });
});

describe("ConsistentHashRing._findPartition", function () {
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
	
	it("A is found", function () { test("A", true); });
	it("AB is found", function () { test("AB", true); });
	it("ABC is not found", function () { test("ABC", false); });
});

describe("ConsistentHashRing._constructPartitions", function () {
	var test = function (nodes, options, expected) {
		var partitions = ConsistentHashRing._constructPartitions(nodes, options);
		assert.equal(JSON.stringify(partitions), JSON.stringify(expected));
	};
	
	it("numberOfVirtualNodesPerCollection custom hash", function () {
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
	
	it("numberOfVirtualNodesPerCollection MurmurHash", function () {
		var nodes = ["A", "AB"];
		var options = {
			numberOfVirtualNodesPerCollection: 1,
			computeHash: MurmurHash.hash
		};
		var expected = [
			{
				"hashValue": 1423767502, 
				"node": "A"
			}, 
			{
				"hashValue": 4094335635, 
				"node": "AB"
			}
		];
		
		test(nodes, options, expected);
	});
});

describe("ConsistentHashRing._compareHashes", function () {
	var test = function (a, b, expected) {
		assert.strictEqual(ConsistentHashRing._compareHashes(a, b), expected);
	};
	
	it("-1", function () { test(1, 2, -1); });
	it("0", function () { test(1, 1, 0); });
	it("1", function () { test(2, 1, 1); });
});
