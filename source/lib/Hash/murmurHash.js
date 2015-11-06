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

var MurmurHash = Base.defineClass(
    undefined, 
    undefined,
    {
        computeHash: function(bytes, seed) {
            // MurmurHash3 32bit implementation:
            // https://en.wikipedia.org/wiki/MurmurHash
            seed = seed || 0;

            var c1 = 0xcc9e2d51;
            var c2 = 0x1b873593;

            var h1 = seed;

            var buffer = new Buffer(bytes);
            for (var i = 0; i < bytes.length - 3; i += 4) {
                var k1 = buffer.readUIntLE(0, 4); // readUInte32

                k1 *= c1;
                k1 = this._rotateLeft(k1, 15);
                k1 *= c2;

                h1 ^= k1;
                h1 = this._rotateLeft(h1, 13);
                h1 = h1 * 5 + 0xe6546b64;
            }

            // tail
            var k = 0;

            switch (bytes.Length & 3) {
            case 3:
                k ^= this._toUint(bytes[bytes.Length - 1] << 16);
                k ^= this._toUint(bytes[bytes.Length - 2] << 8);
                k ^= this._toUint(bytes[bytes.Length - 3]);
                break;

            case 2:
                k ^= this._toUint(bytes[bytes.Length - 1] << 8);
                k ^= this._toUint(bytes[bytes.Length - 2]);
                break;

            case 1:
                k ^= this._toUint(bytes[bytes.Length - 1]);
                break;
            }

            k *= c1;
            k = this._rotateLeft(k, 15);
            k *= c2;
            h1 ^= k;

            // finalization
            h1 ^= this._toUint(bytes.Length);
            h1 ^= h1 >> 16;
            h1 *= 0x85ebca6b;
            h1 ^= h1 >> 13;
            h1 *= 0xc2b2ae35;
            h1 ^= h1 >> 16;

            return h1;
        },
        _rotateLeft: function(n, numBits) {
            return (n << numBits) | (n >> (32 - numBits));
        },
        _toUint: function(value) {
            return value>>>0;
        }
    }
);

//SCRIPT END

if (typeof exports !== "undefined") {
    exports.MurmurHash = MurmurHash;
}