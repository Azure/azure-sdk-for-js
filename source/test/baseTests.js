//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

"use strict";

var Base = require("../lib/base");
var assert = require("assert")

describe("Base._trimSlashes", function () {
    var test = function (input, expected) {
        assert.strictEqual(Base._trimSlashes(input), expected);
    };
    
    it("/a/ => a", function () {
        test("/a/", "a");
    });

    it("/a/b => a/b", function () {
        test("/a/b", "a/b");
    });
    
    it("/a/b/ => a/b", function () {
        test("/a/b/", "a/b");
    });
    
    it("a/b/ => a/b", function () {
        test("a/b", "a/b");
    });
    
    it("/a => a", function () {
        test("/a", "a");
    });

    it("a/ => a", function () {
        test("a/", "a");
    });

    it("//a// => a", function () {
        test("//a//", "a");
    });

    it("/ => ", function () {
        test("/", "");
    });

    it("// => ", function () {
        test("//", "");
    });

    it("/// => ", function () {
        test("///", "");
    });
});

describe("Base._isValidCollectionLink", function () {
    var test = function (input, expected) {
        assert.strictEqual(Base._isValidCollectionLink(input), expected);
    };
    
    it("not string => false", function () {
        var testValues = [
            null,
            undefined,
            0,
            function () { },
            [],
            {}
        ];
        
        testValues.forEach(function (value) {
            test(value, false);
        });
    });
    
    it("not four parts => false", function () {
        var testValues = [
            "",
            "a",
            "a/b",
            "a/b/c",
            "a/b/c/d/e",
            "a/b/c/d/e/f"
        ];
        
        testValues.forEach(function (value) {
            test(value, false);
        });
    });

    it("not dbs/x/colls/y => false", function () {
        var testValues = [
            "a/b/c/d",
            "dbs/b/c/d",
            "a/b/colls/d"
        ];
        
        testValues.forEach(function (value) {
            test(value, false);
        });
    });

    it("dbs/x/colls/y => true", function () {
        var testValues = [
            "dbs/b/colls/d",
        ];
        
        testValues.forEach(function (value) {
            test(value, true);
        });
    });
});
