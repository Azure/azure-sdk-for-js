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

var Base = require("../base");
var MurmurHash = require('./murmurHash.js').MurmurHash;

var ConsistentHashRing = Base.defineClass(
    /**
     * HashPartitionResolver implements partitioning based on the value of a hash function, 
     * allowing you to evenly distribute requests and data across a number of partitions.
     * @param {string or function} partitionKeyExtractor  - If partitionKeyExtractor is a string, it should be the name of the property in the document to execute the hashing on.
     *                                                      If partitionKeyExtractor is a function, it should be a function to extract the partition key from any object.
     **/
	function (nodes, options) {
		ConsistentHashRing._throwIfInvalidNodes(nodes);
		
		options = options || {};
		options.computeHash = options.computeHash || MurmurHash.hash;
		this.computeHash = options.computeHash
		
		this.partitions = ConsistentHashRing._constructPartitions(nodes, options);
    }, {
		getNode: function (key) {
			var hash = this.computeHash(key);
			var partition = this._findPartition(hash);
			return this.partitions[partition].node;
		},
		/** @ignore */
		_findPartition: function (hash) {
			//TODO: use binary search
			for (var i = 0; i < this.partitions.length - 1; i++) {
				if (ConsistentHashRing._compareHashes(this.partitions[i].hashValue, hash) >= 0) {
					break;
				}
			}
			return i;
		}
	}, {
		/** @ignore */
		_constructPartitions: function (nodes, options) {
			var partitionsPerNode = options.numberOfVirtualNodesPerCollection || 128
			var partitions = new Array();
			
			nodes.forEach(function (node) {
				var hashValue = options.computeHash(node);
				for (var j = 0; j < partitionsPerNode; j++) {
					partitions.push({
						hashValue: hashValue, 
						node: node
					});
					
					hashValue = options.computeHash(hashValue);
				}
			});
	
			partitions.sort(function (x, y) {
				return ConsistentHashRing._compareHashes(x.hashValue, y.hashValue);
			});
			return partitions;
		},
		/** @ignore */
		_compareHashes: function (x, y) {
			if (x < y) return -1;
			if (x > y) return 1;
			return 0;
		},
		/** @ignore */
		_throwIfInvalidNodes: function (nodes) {
			if (Array.isArray(nodes)) {
				return;
			}
			
			throw new Error("Invalid argument: 'nodes' has to be an array.");
		},
	}
		
);

//SCRIPT END

if (typeof exports !== "undefined") {
    exports.ConsistentHashRing = ConsistentHashRing;
}