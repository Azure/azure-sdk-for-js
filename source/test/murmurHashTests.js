//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

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
