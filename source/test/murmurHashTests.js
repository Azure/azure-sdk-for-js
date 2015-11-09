//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

"use strict";

var MurmurHash = require("../lib/Hash/murmurHash").MurmurHash;
var assert = require("assert")

describe("Test MurmurHash.computeHash()", function () {
	var test = function (input, expected) {
		assert.equal(MurmurHash.hash(input), expected);
	};
	
	it("374.0 => 3717946798", function () {
		test(new Buffer([0,0,0,0,0, 96, 119, 64]), 3717946798);
	});

	it("\"afdgdd\" => 1099701186", function () {
		test(new Buffer("afdgdd"), 1099701186);
	});
});