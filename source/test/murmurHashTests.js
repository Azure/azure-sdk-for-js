//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

"use strict";

var MurmurHash = require("../lib/Hash/murmurHash").MurmurHash;
var assert = require("assert")

describe("MurmurHash._toUint tests", function () {
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
