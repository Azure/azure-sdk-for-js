//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

"use strict";

var MurmurHash = require("../lib/Hash/murmurHash").MurmurHash;
var assert = require("assert")

describe("Test MurmurHash._toUint()", function () {
	var test = function (input, expected) {
		assert.equal(MurmurHash._toUint(input), expected);
	};
	
	it("_toUint(4294967292)", function () { test(4294967292, 4294967292); });
	it("_toUint(4294967293)", function () { test(4294967293, 4294967293); });
	it("_toUint(4294967294)", function () { test(4294967294, 4294967294); });
	it("_toUint(4294967295)", function () { test(4294967295, 4294967295); });
	it("_toUint(4294967296)", function () { test(4294967296, 0); });
	it("_toUint(4294967297)", function () { test(4294967297, 1); });
	it("_toUint(4294967298)", function () { test(4294967298, 2); });
	it("_toUint(4294967299)", function () { test(4294967299, 3); });
	it("_toUint(5954853657095795121)", function () { test(5954853657095795121, 3634459057); });
});

describe("Test MurmurHash._rotateLeft()", function () {
	var test = function (n, numBits, expected) {
		assert.equal(MurmurHash._rotateLeft(n, numBits), expected);
	};
	
	it("(0, 15) => 0", function () { test(0, 15, 0); });
	it("(0, 13) => 0", function () { test(0, 13, 0); });
	it("(2711969792, 15) => 2952810706", function () { test(2711969792, 15, 2952810706); });
	it("(3078444964, 15) => 2882689982", function () { test(3078444964, 15, 2882689982); });
	it("(3634459057, 15) => 3101224016", function () { test(3634459057, 15, 3101224016); });
	it("(464273904, 13) => 2285765493", function () { test(464273904, 13, 2285765493); });
	it("(66292210, 13) => 1899905150", function () { test(66292210, 13, 1899905150); });
});

describe("Test MurmurHash.computeHash()", function () {
	var test = function (input, expected) {
		assert.equal(MurmurHash.computeHash(input), expected);
	};
	
	it("374.0 => 3717946798", function () {
		test(new Buffer([0,0,0,0,0, 96, 119, 64]), 3717946798);
	});

	it("\"afdgdd\" => 1099701186", function () {
		test(new Buffer("afdgdd"), 1099701186);
	});
});
