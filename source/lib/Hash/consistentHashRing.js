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

var Base = require("./base");

var ConsistentHashRing = Base.defineClass(
    /**
     * HashPartitionResolver implements partitioning based on the value of a hash function, 
     * allowing you to evenly distribute requests and data across a number of partitions.
     * @param {string or function} partitionKeyExtractor  - If partitionKeyExtractor is a string, it should be the name of the property in the document to execute the hashing on.
     *                                                      If partitionKeyExtractor is a function, it should be a function to extract the partition key from any object.
     **/
    function (hashGenerator, nodes, totalPartitions, byteArrayGenerator) {
        this.hashGenerator = hashGenerator;
        this.nodes = nodes;
        this.totalPartitions = totalPartitions;
        this.byteArrayGenerator = byteArrayGenerator;
        this.partitions = HashPartitionResolver.constructPartitions(this);
    }, {
        getNode: function(key) {
            return this._getNode(key);
        },
        /** @ignore */
        _getNode: function(key) {
            var partition = this.computePartition(key);
            return partitions[partition].node;
        }
    }, {
        constructPartitions: function (consistentHashRing) {
            HashPartitionResolver._throwIfInvalidConsistentHashRing(consistentHashRing);

            var nodeCount = consistentHashRing.nodes.length;
            var partitions = new Array();
            var partitionsPerNode = consistentHashRing.totalPartitions / nodeCount;
            var extraPartitions = consistentHashRing.totalPartitions - partitionsPerNode * nodeCount;

            consistentHashRing.nodes.forEach(function (node) {
                var hashValue = consistentHashRing.hashGenerator.computeHash(node);
                for (var j = 0; j < partitionsPerNode + (extraPartitions > 0 ? 1 : 0); j++) {
                    partitions.push({
                        hashValue: hashValue, 
                        node: node
                    });
                    
                    hashValue = consistentHashRing.hashGenerator.computeHash(hashValue);
                }
                extraPartitions--;
            });

            partitions.sort();
            return partitions;
        },
        /** @ignore */
        _throwIfInvalidConsistentHashRing: function (consistentHashRing) {
            if (!Array.isArray(consistentHashRing.nodes.length)) {
                throw new Error("nodes has to be an array.");
            }
        },
        /** @ignore */
        _skipReplicas: function (partitions, partition) {
            var replica = 0;
            var dups = [replica];
            var partition2 = partition;
            while (replica > 0) {
                dups[dups.length - replica] = partitions[partition2].node;
                do {
                    partition2 = (partition2 + 1) % partitions.Length;
                    if (partition2 === partition) {
                        throw new Error("Not enough nodes for the requested replica");
                    }
                } while (dups.slice(0, dups.length - replica + 1).indexOf(partitions[partition2].node));

                replica--;
            }

            return partition2;
        }
    }
);

//SCRIPT END

if (typeof exports !== "undefined") {
    exports.ConsistentHashRing = ConsistentHashRing;
}