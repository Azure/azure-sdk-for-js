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
		computeHash: function (key, seed) {
			key = key || '';
			seed = seed || 0;
			
			if (typeof key === "string") {
				return this._hashString(key, seed);
			}
			
			return this._hashBytes(key, seed);
		},
		_rotateLeft: function (n, numBits) {
			return (n << numBits) | (n >>> (32 - numBits));
		},
		_readUInt32: function (uint32Array, i) {
			return (uint32Array[i]) | (uint32Array[i + 1] << 8) | (uint32Array[i + 2] << 16) | (uint32Array[i + 3] << 24);
		},
		_multiply: function (m, n) {
			return ((m & 0xffff) * n) + ((((m >>> 16) * n) & 0xffff) << 16);
		},
		_hashString: function (key, seed) {
			return this._hashBytes(new Buffer(key), seed);
		},
		_hashBytes: function (bytes, seed) {
			var h1 = seed;
			
			var k1 = 0;
			
			var c1 = 0xcc9e2d51;
			var c2 = 0x1b873593;
			
			var reader = new Uint32Array(bytes);
			{
				for (var i = 0; i < bytes.length - 3; i += 4) {
					k1 = this._readUInt32(reader, i);
					
					k1 = this._multiply(k1, c1);
					k1 = this._rotateLeft(k1, 15);
					k1 = this._multiply(k1, c2);
					
					h1 ^= k1;
					h1 = this._rotateLeft(h1, 13);
					h1 = this._multiply(h1, 5) + 0xe6546b64;
				}
			}
			
			k1 = 0;
			
			switch (bytes.length & 3) {
				case 3:
					k1 ^= reader[i + 2] << 16;

				case 2:
					k1 ^= reader[i + 1] << 8;

				case 1:
					k1 ^= reader[i];
					k1 = this._multiply(k1, c1);
					k1 = this._rotateLeft(k1, 15);
					k1 = this._multiply(k1, c2);
					h1 ^= k1;
			}
			
			h1 ^= bytes.length;
			h1 ^= h1 >>> 16;
			h1 = this._multiply(h1, 0x85ebca6b);
			h1 ^= h1 >>> 13;
			h1 = this._multiply(h1, 0xc2b2ae35);
			h1 ^= h1 >>> 16;
			
			return h1 >>> 0;
		}
	});

//SCRIPT END

if (typeof exports !== "undefined") {
	exports.MurmurHash = MurmurHash;
}