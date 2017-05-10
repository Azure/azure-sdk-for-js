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

var assert = require("assert");
var ConsistentHashRing = require("../lib/hash/consistentHashRing").ConsistentHashRing;

describe("ConsistentHashRing new()", function () {
    it("valid arguments does not throw", function () {
        var ring = new ConsistentHashRing(["bar"]);
        assert(ring);
        assert.strictEqual(ring._partitions.length, 128);
    });
    
    it("invalid nodes throws", function () {
        assert.throws(
            function () {
                var ring = new ConsistentHashRing();
            },
            /Invalid argument: 'nodes' has to be an array./
        );
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

describe("ConsistentHashRing._search", function () {
    var test = function (nodes, key, expected) {
        var result = ConsistentHashRing._search(nodes, key);
        var actual = nodes[result].hashValue;
        
        var message = {
            key: key,
            expected: expected,
            actual: actual
        };

        assert.strictEqual(expected, actual, JSON.stringify(message));
    }

    it("10", function () {
        var test1 = function (key, expected) {
            var nodes = [
                { hashValue: 10 }
            ];

            test(nodes, key, expected);
        }
        
        test1(Number.NEGATIVE_INFINITY, 10);
        test1(9, 10);
        test1(10, 10);
        test1(11, 10);
        test1(Number.POSITIVE_INFINITY, 10);
    });

    it("10, 20", function () {
        var test2 = function (key, expected) {
            var nodes = [
                { hashValue: 10 }, 
                { hashValue: 20 }
            ];
            
            test(nodes, key, expected);
        }
        
        test2(Number.NEGATIVE_INFINITY, 20);
        test2(10, 10);
        test2(11, 10);
        test2(19, 10);
        test2(20, 20);
        test2(Number.POSITIVE_INFINITY, 20);
    });

    it("10, 20, 30", function () {
        var test3 = function (key, expected) {
            var nodes = [
                { hashValue: 10 }, 
                { hashValue: 20 }, 
                { hashValue: 30 }
            ];
            
            test(nodes, key, expected);
        }
        
        test3(Number.NEGATIVE_INFINITY, 30);
        test3(10, 10);
        test3(11, 10);
        test3(19, 10);
        test3(20, 20);
        test3(21, 20);
        test3(29, 20);
        test3(30, 30);
        test3(31, 30);
        test3(Number.POSITIVE_INFINITY, 30);
    });
});

describe("ConsistentHashRing.getNode", function () {
    it("A(10), B(20), C(30)", function () {
        var test = function (key, expected) {
            var nodes = ["A", "B", "C"];
            var options = {
                partitionsPerNode: 1,
                computeHash: function (key) {
                    if (key === "A") return 10;
                    if (key === "B") return 20;
                    if (key === "C") return 30;
                    
                    if (key === "a") return 15;
                    if (key === "b") return 25;
                    if (key === "c") return 35;

                    return 0;
                }
            };
            
            var ring = new ConsistentHashRing(nodes, options);
            var actual = ring.getNode(key);
            
            var message = {
                key: key,
                expected: expected,
                actual: actual
            };
            assert.strictEqual(expected, actual, JSON.stringify(message));
        }
        
        test("a", "A");
        test("b", "B");
        test("c", "C");
        test("d", "C");
    });

});

describe("ConsistentHashRing._throwIfInvalidNodes", function () {
    it("does not throw", function () {
        assert.doesNotThrow(function () {
            ConsistentHashRing._throwIfInvalidNodes([]);
        });
    });
    
    it("throws", function () {
        var test = function (nodes) {
            assert.throws(
                function () {
                    ConsistentHashRing._throwIfInvalidNodes(nodes);
                },
                /Invalid argument: 'nodes' has to be an array./
            );
        };
        
        var values = [
            undefined,
            null,
            "string",
            0,
            true,
            {},
            function () { }
        ];
        
        values.forEach(function (nodes) {
            test(nodes);
        });
    });
});
