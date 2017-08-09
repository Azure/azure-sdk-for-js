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

var Base = require("../base");
var MurmurHash = require('./murmurHash.js').MurmurHash;

//SCRIPT START
var ConsistentHashRing = Base.defineClass(
    /**
     * Initializes a new instance of the ConsistentHashRing
     * @param {string[]} nodes - Array of collection links
     * @param {object} options - Options to initialize the ConsistentHashRing
     * @param {function} options.computeHash - Function to compute the hash for a given link or partition key
     * @param {function} options.numberOfVirtualNodesPerCollection - Number of points in the ring to assign to each collection link
     */
    function (nodes, options) {
        ConsistentHashRing._throwIfInvalidNodes(nodes);
        
        options = options || {};
        options.numberOfVirtualNodesPerCollection = options.numberOfVirtualNodesPerCollection || 128;
        options.computeHash = options.computeHash || MurmurHash.hash;
        
        this._computeHash = options.computeHash;
        this._partitions = ConsistentHashRing._constructPartitions(nodes, options.numberOfVirtualNodesPerCollection, options.computeHash);
    }, {
        getNode: function (key) {
            var hash = this._computeHash(key);
            var partition = ConsistentHashRing._search(this._partitions, hash);            
            return this._partitions[partition].node;
        }
    },{
        /** @ignore */
        _constructPartitions: function (nodes, partitionsPerNode, computeHashFunction) {
            var partitions = new Array();
            nodes.forEach(function (node) {
                var hashValue = computeHashFunction(node);
                for (var j = 0; j < partitionsPerNode; j++) {
                    partitions.push({
                        hashValue: hashValue, 
                        node: node
                    });
                    
                    hashValue = computeHashFunction(hashValue);
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
        _search: function (partitions, hashValue) {
            for (var i = 0; i < partitions.length - 1; i++) {
                if (hashValue >= partitions[i].hashValue && hashValue < partitions[i + 1].hashValue) {
                    return i;
                }
            }
            
            return partitions.length - 1;
        },
        /** @ignore */
        _throwIfInvalidNodes: function (nodes) {
            if (Array.isArray(nodes)) {
                return;
            }
            
            throw new Error("Invalid argument: 'nodes' has to be an array.");
        }
    }
        
);

//SCRIPT END

if (typeof exports !== "undefined") {
    exports.ConsistentHashRing = ConsistentHashRing;
}