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

//SCRIPT START
var MurmurHash = Base.defineClass(
    undefined, 
    undefined,
    {
        /**
         * Hashes a string, a unsigned 32-bit integer, or a Buffer into a new unsigned 32-bit integer that represents the output hash.
         * @param {string, number of Buffer} key  - The preimage of the hash
         * @param {number} seed                   - Optional value used to initialize the hash generator
         * @returns {} 
         */
        hash: function (key, seed) {
            key = key || '';
            seed = seed || 0;
            
            MurmurHash._throwIfInvalidKey(key);
            MurmurHash._throwIfInvalidSeed(seed);
            
            var buffer;
            if (typeof key === "string") {
                buffer = MurmurHash._getBufferFromString(key);
            }
            else if (typeof key === "number") {
                buffer = MurmurHash._getBufferFromNumber(key);
            }
            else {
                buffer = key;
            }
            
            return MurmurHash._hashBytes(buffer, seed);
        },
        /** @ignore */
        _throwIfInvalidKey: function (key) {
            if (key instanceof Buffer) {
                return;
            }
            
            if (typeof key === "string") {
                return;
            }
            
            if (typeof key === "number") {
                return;
            }
            
            throw new Error("Invalid argument: 'key' has to be a Buffer, string, or number.");
        },
        /** @ignore */
        _throwIfInvalidSeed: function (seed) {
            if (isNaN(seed)) {
                throw new Error("Invalid argument: 'seed' is not and cannot be converted to a number.");
            }
        },
        /** @ignore */
        _getBufferFromString: function (key) {
            var buffer = new Buffer(key);
            return buffer;
        },
        /** @ignore */
        _getBufferFromNumber: function (i) {
            i = i >>> 0;
            
            var buffer = new Uint8Array([
                i >>> 0,
                i >>> 8,
                i >>> 16,
                i >>> 24
            ]);

            return buffer;
        },
        /** @ignore */
        _hashBytes: function (bytes, seed) {
            var c1 = 0xcc9e2d51;
            var c2 = 0x1b873593;
            
            var h1 = seed;
            var reader = new Uint32Array(bytes);
            {
                for (var i = 0; i < bytes.length - 3; i += 4) {
                    var k1 = MurmurHash._readUInt32(reader, i);
                    
                    k1 = MurmurHash._multiply(k1, c1);
                    k1 = MurmurHash._rotateLeft(k1, 15);
                    k1 = MurmurHash._multiply(k1, c2);
                    
                    h1 ^= k1;
                    h1 = MurmurHash._rotateLeft(h1, 13);
                    h1 = MurmurHash._multiply(h1, 5) + 0xe6546b64;
                }
            }
            
            var k = 0;
            switch (bytes.length & 3) {
                case 3:
                    k ^= reader[i + 2] << 16;
                    k ^= reader[i + 1] << 8;
                    k ^= reader[i];
                    break;

                case 2:
                    k ^= reader[i + 1] << 8;
                    k ^= reader[i];
                    break;

                case 1:
                    k ^= reader[i];
                    break;
            }
            
            k = MurmurHash._multiply(k, c1);
            k = MurmurHash._rotateLeft(k, 15);
            k = MurmurHash._multiply(k, c2);
            
            h1 ^= k;
            h1 ^= bytes.length;
            h1 ^= h1 >>> 16;
            h1 = MurmurHash._multiply(h1, 0x85ebca6b);
            h1 ^= h1 >>> 13;
            h1 = MurmurHash._multiply(h1, 0xc2b2ae35);
            h1 ^= h1 >>> 16;
            
            return h1 >>> 0;
        },
        /** @ignore */
        _rotateLeft: function (n, numBits) {
            return (n << numBits) | (n >>> (32 - numBits));
        },
        /** @ignore */
        _multiply: function (m, n) {
            return ((m & 0xffff) * n) + ((((m >>> 16) * n) & 0xffff) << 16);
        },
        /** @ignore */
        _readUInt32: function (uintArray, i) {
            return (uintArray[i]) | (uintArray[i + 1] << 8) | (uintArray[i + 2] << 16) | (uintArray[i + 3] << 24) >>> 0;
        }
    });

//SCRIPT END

if (typeof exports !== "undefined") {
    exports.MurmurHash = MurmurHash;
}