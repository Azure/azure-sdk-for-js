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

var MurmurHash = require("../lib/hash/murmurHash").MurmurHash;
var assert = require("assert")

describe("MurmurHash.hash", function () {
    var test = function (input, seed, expected) {
        assert.equal(MurmurHash.hash(input, seed), expected);
    };
    
    it("374", function () { 
        test(374, 0, 2455513042); 
    });

    it("Buffer(374.0)", function () {
        test(new Buffer([0, 0, 0, 0, 0, 96, 119, 64]), 0, 3717946798);
    });

    it("Buffer(\"afdgdd\")", function () {
        test(new Buffer("afdgdd"), 0, 1099701186);
    });

    it("afdgdd", function () {
        test("afdgdd", 0, 1099701186);
    });

    it("\"\"", function () {
        test("", 0x1B873593, 1738713326);
    });

    it("\"1\"", function () {
        test("1", 0xE82562E4, 3978597072);
    });

    it("\"00\"", function () {
        test("00", 0xB4C39035, 459540986);
    });

    it("eyetooth", function () {
        test("eyetooth", 0x8161BD86, 1864131224);
    });

    it("acid", function () {
        test("acid", 0x4DFFEAD7, 3116405302);
    });

    it("elevation", function () {
        test("elevation", 0x1A9E1828, 3745560233);
    });

    it("dent", function () {
        test("dent", 0xE73C4579, 3554761172);
    });

    it("homeland", function () {
        test("homeland", 0xB3DA72CA, 3144830214);
    });

    it("glamor", function () {
        test("glamor", 0x8078A01B, 2812447113);
    });

    it("flags", function () {
        test("flags", 0x4D16CD6C, 40273746);
    });

    it("democracy", function () {
        test("democracy", 0x19B4FABD, 2966836708);
    });

    it("bumble", function () {
        test("bumble", 0xE653280E, 214161406);
    });

    it("catch", function () {
        test("catch", 0xB2F1555F, 3451276184);
    });

    it("omnomnomnivore", function () {
        test("omnomnomnivore", 0x7F8F82B0, 4291675192);
    });

    it("The quick brown fox jumps over the lazy dog", function () {
        test("The quick brown fox jumps over the lazy dog", 0x4C2DB001, 3381504877);
    });
});

describe("MurmurHash._getBufferFromNumber", function () {
    var test = function (input, expected) {
        var actual = MurmurHash._getBufferFromNumber(input);
        assert.equal(actual.length, expected.length);
        for (var i; i < actual.length; i++) {
            assert.equal(actual.buffer[i], expected[i]);
        }
    };
    
    it("374", function () {
        test(374, [118, 1, 0, 0]);
    });
});
