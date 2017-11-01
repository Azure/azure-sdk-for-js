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

describe("Base.getAttachmentIdFromMediaId", function () {
    var test = function (input, expected) {
        assert.strictEqual(Base.getAttachmentIdFromMediaId(input), expected);
    };
    
    it("> 20 characters, Alpha-numeric only:  6hl2ALdWbQCxAgAAAAAAAC4b1VoB => 6hl2ALdWbQCxAgAAAAAAAC4b1Vo=", function () {
        test("6hl2ALdWbQCxAgAAAAAAAC4-1VoB", "6hl2ALdWbQCxAgAAAAAAAC4-1Vo=");
    });
    
    it("> 20 characters, Single hyphen '-':  6hl2ALdWbQCxAgAAAAAAAC4-1VoB => 6hl2ALdWbQCxAgAAAAAAAC4-1Vo=", function () {
        test("6hl2ALdWbQCxAgAAAAAAAC4-1VoB", "6hl2ALdWbQCxAgAAAAAAAC4-1Vo=");
    });
    
    it("> 20 characters, Multiple hyphens '-':  6hl2ALdWb-CxAgAAAAAAAC4-1VoB => 6hl2ALdWb-CxAgAAAAAAAC4-1Vo=", function () {
        test("6hl2ALdWb-CxAgAAAAAAAC4-1VoB", "6hl2ALdWb-CxAgAAAAAAAC4-1Vo=");
    });
    
    it("> 20 characters, Plus sign '+':  6hl2ALdWb+CxAgAAAAAAAC4Q1VoB => 6hl2ALdWb+CxAgAAAAAAAC4Q1Vo=", function () {
        test("6hl2ALdWb-CxAgAAAAAAAC4-1VoB", "6hl2ALdWb-CxAgAAAAAAAC4-1Vo=");
    });
    
    it("> 20 characters, Plus sign '+', Hyphen '-':  6hl2ALdWb+CxAgAAAAAAAC4-1VoB => 6hl2ALdWb+CxAgAAAAAAAC4-1Vo=", function () {
        test("6hl2ALdWb-CxAgAAAAAAAC4-1VoB", "6hl2ALdWb-CxAgAAAAAAAC4-1Vo=");
    });
    
    it("< 20 characters, Plus sign '+', Hyphen '-':  6hl2A-dWb+CxAgAAAA => 6hl2A-dWb+CxAgAAAA", function () {
        test("6hl2A-dWb+CxAgAAAA", "6hl2A-dWb+CxAgAAAA");
    });

});

describe("Base.parsePath", function () {
    var test = function (input, expected) {
        assert.strictEqual(JSON.stringify(Base.parsePath(input)), JSON.stringify(expected));
    };
    
    it("escape control characters 1", function () {
        test("/\"Ke \\ \\\" \\\' \\? \\a \\\b \\\f \\\n \\\r \\\t \\v y1\"/*", [ "Ke \\ \\\" \\\' \\? \\a \\\b \\\f \\\n \\\r \\\t \\v y1", "*" ]);
    });

    it("escape control characters 2", function () {
        test("/'Ke \\ \\\" \\\' \\? \\a \\\b \\\f \\\n \\\r \\\t \\v y1'/*", [ "Ke \\ \\\" \\\' \\? \\a \\\b \\\f \\\n \\\r \\\t \\v y1", "*" ]);
    });

    it("test paths", function () {
        var fs = require("fs");
        var path = require("path");

        var content = fs.readFileSync(path.resolve(__dirname, 'BaselineTest.PathParser.json'));
        var obj = JSON.parse(content);
        obj.forEach(function (entry) {
            test(entry.path, entry.parts);
        });
    });
});
