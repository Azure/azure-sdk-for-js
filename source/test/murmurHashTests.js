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

var MurmurHash = require("../lib/Hash/murmurHash").MurmurHash;
var assert = require("assert")

describe("MurmurHash.hash", function () {
    var test = function (input, expected) {
        assert.equal(MurmurHash.hash(input), expected);
    };
    
    it("374", function () {
        test(374, 2455513042);
    });
    
    it("Buffer(374.0)", function () {
        test(new Buffer([0,0,0,0, 0,96,119,64]), 3717946798);
    });

    it("Buffer(\"afdgdd\")", function () {
        test(new Buffer("afdgdd"), 1099701186);
    });

    it("\"afdgdd\"", function () {
        test("afdgdd", 1099701186);
    });
});

describe("MurmurHash._getBufferFromNumber", function () {
    var test = function (input, expected) {
        var actual = MurmurHash._getBufferFromNumber(input);
        assert.deepEqual(actual, expected);
    };
    
    it("374", function () {
        test(374, [118, 1, 0, 0]);
    });
});
