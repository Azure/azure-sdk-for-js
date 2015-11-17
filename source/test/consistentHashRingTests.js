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

var assert = require("assert");
var ConsistentHashRing = require("../lib/Hash/consistentHashRing").ConsistentHashRing;

describe("ConsistentHashRing new()", function () {
	it("valid arguments does not throw", function () {
		assert.doesNotThrow(
			function () {
				var resolver = new ConsistentHashRing(["bar"]);
			}
		);
	});
	
	it("invalid nodes throws", function () {
		var test = function (nodes) {
			assert.throws(
				function () {
					var resolver = new ConsistentHashRing(nodes)
				},
			/Invalid argument: 'nodes' has to be an array./
			);
		};
		
		var values = [
			undefined,
			null,
			"string",
			0,
			true
		];
		
		values.forEach(function (nodes) {
			test(nodes);
		});
	});
});

describe("ConsistentHashRing._constructPartitions", function () {
	it("construct ring", function () {
		var fixedHashValue = 123;
		var partitionsPerNode = 2;
		var nodes = ["A", "B", "C"];
		var timesComputeHashCalled = 0;
		var computeHash = function () {
				timesComputeHashCalled++;
				return fixedHashValue;
		};
		var totalPartitions = partitionsPerNode * nodes.length;
		var totalCalls = (partitionsPerNode + 1) * nodes.length;
		
		var partitions = ConsistentHashRing._constructPartitions(nodes, partitionsPerNode, computeHash);
		
		assert.strictEqual(totalPartitions, partitions.length);
		assert.strictEqual(totalCalls, timesComputeHashCalled);
		
		partitions.forEach(function (partition) {
			assert(partition.node);
			assert.strictEqual(fixedHashValue, partition.hashValue);
		});
	});
});

describe("ConsistentHashRing._compareHashes", function () {
	var test = function (a, b, result) {
		var actual = ConsistentHashRing._compareHashes(a, b);
		assert.strictEqual(result, actual);
	}
	
	it("a=b", function () {
		test(0, 0, 0);
	});
	
	it("a>b", function () {
		test(1, 0, 1);
	});
	
	it("a<b", function () {
		test(0, 1, -1);
	});
});

describe("ConsistentHashRing._binarySearch", function () {
	describe("1 node", function () {
		var test = function (key, expected) {
			var nodes = [10];
			var actual = ConsistentHashRing._binarySearch(nodes, key);
			assert.strictEqual(expected, nodes[actual]);
		}
		
		it("NEGATIVE_INFINITY", test(Number.NEGATIVE_INFINITY, 10));
		it("9", test(9, 10));
		it("10", test(10, 10));
		it("11", test(11, 10));
		it("POSITIVE_INFINITY", test(Number.POSITIVE_INFINITY, 10));
	});

	it("2 nodes", function () {
		var test = function (key, expected) {
			var nodes = [10, 20];
			var actual = ConsistentHashRing._binarySearch(nodes, key);
			assert.strictEqual(expected, nodes[actual]);
		}
		
		test(Number.NEGATIVE_INFINITY, 10);
		
//		test(10, 10);
		
//		test(11, 20);
//		test(19, 20);
		
//		test(20, 20);
		
//		test(Number.POSITIVE_INFINITY, 20);
	});

	it("3 nodes", function () {
		var test = function (key, expected) {
			var nodes = [10, 20, 30];
			var actual = ConsistentHashRing._binarySearch(nodes, key);
			assert.strictEqual(expected, nodes[actual]);
		}
		
//		test(Number.NEGATIVE_INFINITY, 10);
		//test(10, 10);
		
		//test(11, 20);
		//test(19, 20);
		//test(20, 20);
		
		//test(21, 30);
		//test(29, 30);
		//test(30, 30);
		//test(Number.POSITIVE_INFINITY, 10);
	});
});
