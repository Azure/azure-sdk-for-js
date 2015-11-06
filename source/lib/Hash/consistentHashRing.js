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

var ConsistentHashRing = Base.defineClass(
    /**
     * HashPartitionResolver implements partitioning based on the value of a hash function, 
     * allowing you to evenly distribute requests and data across a number of partitions.
     * @param {string or function} partitionKeyExtractor  - If partitionKeyExtractor is a string, it should be the name of the property in the document to execute the hashing on.
     *                                                      If partitionKeyExtractor is a function, it should be a function to extract the partition key from any object.
     **/
	function (options) {
		options = options || {};
		
		ConsistentHashRing._throwIfInvalidConsistentHashRing(options);
		
		this.hashGenerator = options.hashGenerator;
        this.nodes = options.nodes;
        this.totalPartitions = options.totalPartitions;
        this.partitions = ConsistentHashRing._constructPartitions(options);
    }, {
		getNode: function (key) {
			var partition = this._findPartition(key);
			return (partition < this.partitions.length) ? this.partitions[partition].node : null;
		},
		/** @ignore */
		_findPartition: function (key) {
			//TODO: binary search
			var hash = this.hashGenerator.computeHash(key);
			for (var i = 0; i < this.partitions.length; i++) {
				if (ConsistentHashRing._areEqual(this.partitions[i].hashValue, hash)) break;
			}
			
			return i;
		}
	}, {
		/** @ignore */
        _constructPartitions: function (options) {
            var nodeCount = options.nodes.length;
            var partitions = new Array();
            var partitionsPerNode = options.totalPartitions / nodeCount;
            var extraPartitions = options.totalPartitions - partitionsPerNode * nodeCount;

            options.nodes.forEach(function (node) {
                var hashValue = options.hashGenerator.computeHash(node);
                for (var j = 0; j < partitionsPerNode + (extraPartitions > 0 ? 1 : 0); j++) {
                    partitions.push({
                        hashValue: hashValue, 
                        node: node
                    });
                    
                    hashValue = options.hashGenerator.computeHash(hashValue);
                }
                extraPartitions--;
            });

            partitions.sort();
            return partitions;
        },
        /** @ignore */
        _throwIfInvalidConsistentHashRing: function (options) {
            if (!Array.isArray(options.nodes)) {
                throw new Error("nodes has to be an array.");
            }
		},
		/** @ignore */
		_areEqual: function (byteArray1, byteArray2) {
			if (!Array.isArray(byteArray1)) return false;
			if (!Array.isArray(byteArray2)) return false;
			if (byteArray1.length !== byteArray2.length) return false;

			for (var i = 0; i < byteArray1.length; i++) { 
				if (byteArray1[i] !== byteArray2[i]) return false;
			}

			return true;
		}
    }
);

//SCRIPT END

if (typeof exports !== "undefined") {
    exports.ConsistentHashRing = ConsistentHashRing;
}