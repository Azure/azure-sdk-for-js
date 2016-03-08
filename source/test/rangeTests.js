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

var lib = require("../lib/"),
    assert = require("assert");

var Range = lib.Range;

describe("Range Tests", function () {
    describe("constructor", function () {
        var invalidOptionsTest = function (options, expectedError, done) {
            assert.throws(
                function () {
                    var r = new Range(options);
                },
                    expectedError);
            done();
        }

        var optionsIsNullTest = function (options, done) {
            invalidOptionsTest(options, /Invalid argument: 'options' is null/, done);
        }

        var optionsIsNotAnObjectTest = function (options, done) {
            invalidOptionsTest(options, /Invalid argument: 'options' is not an object/, done);
        }

        var invalidRangeTest = function (options, done) {
            invalidOptionsTest(options, /Invalid argument: 'options.low' must be less than or equal than 'options.high'/, done);
        }

        it("options - undefined (ommited argument)", function (done) {
            assert(new Range());
            done();
        });

        it("options - undefined (literal argument)", function (done) {
            assert(new Range(undefined));
            done();
        });

        it("options - null ", function (done) {
            var options = null;
            optionsIsNullTest(options, done);
        });

        it("options - number", function (done) {
            var options = 0;
            optionsIsNotAnObjectTest(options, done);
        });

        it("invalid options - string", function (done) {
            var options = "";
            optionsIsNotAnObjectTest(options, done);
        });

        it("invalid options - boolean", function (done) {
            var options = false;
            optionsIsNotAnObjectTest(options, done);
        });

        it("Range instances are frozen", function (done) {
            var r = new Range();

            assert.throws(
                function () {
                    r.compareFunction = 1;
                },
                /Can't add property compareFunction, object is not extensible/
            );

            done();
        });
    });

    describe("_contains", function () {
        it("undefined,undefined contains undefined is true", function (done) {
            var r = new Range();
            assert(r._contains(undefined));
            done();
        });

        it("undefined,undefined contains null is false", function (done) {
            var r = new Range();
            assert(!r._contains(null));
            done();
        });

        it("null,null contains undefined is true", function (done) {
            var r = new Range({ low: null });
            assert(r._contains(null));
            done();
        });

        it("null,null contains null is true", function (done) {
            var r = new Range({ low: null });
            assert(r._contains(null));
            done();
        });

        it("range contains self is true - default range", function (done) {
            var r = new Range();
            assert(r._contains(r));
            done();
        });

        it("range contains self is true - non-default range", function (done) {
            var r = new Range({ low: "A" });
            assert(r._contains(r));
            done();
        });

        it("A,D contains B,C is true", function (done) {
            var r1 = new Range({ low: "A", high: "D" });
            var r2 = new Range({ low: "B", high: "C" });
            assert(r1._contains(r2));
            done();
        });

        it("B,C contains A,D is false", function (done) {
            var r1 = new Range({ low: "B", high: "C" });
            var r2 = new Range({ low: "A", high: "D" });
            assert(!r1._contains(r2));
            done();
        });

        it("A,C contains B,D is false", function (done) {
            var r1 = new Range({ low: "A", high: "C" });
            var r2 = new Range({ low: "B", high: "D" });
            assert(!r1._contains(r2));
            done();
        });

        it("B,D contains A,C is false", function (done) {
            var r1 = new Range({ low: "B", high: "D" });
            var r2 = new Range({ low: "A", high: "C" });
            assert(!r1._contains(r2));
            done();
        });

        it("A,B contains B,C is false", function (done) {
            var r1 = new Range({ low: "A", high: "B" });
            var r2 = new Range({ low: "B", high: "C" });
            assert(!r1._contains(r2));
            done();
        });

        it("B,C contains A,B is false", function (done) {
            var r1 = new Range({ low: "B", high: "C" });
            var r2 = new Range({ low: "A", high: "B" });
            assert(!r1._contains(r2));
            done();
        });

        it("A,B contains C,D is false", function (done) {
            var r1 = new Range({ low: "A", high: "B" });
            var r2 = new Range({ low: "C", high: "D" });
            assert(!r1._contains(r2));
            done();
        });

        it("C,D contains A,B is false", function (done) {
            var r1 = new Range({ low: "C", high: "D" });
            var r2 = new Range({ low: "A", high: "B" });
            assert(!r1._contains(r2));
            done();
        });

        it("A,C contains B is true", function (done) {
            var r1 = new Range({ low: "A", high: "C" });
            assert(r1._contains("B"));
            done();
        });

        it("B,C contains A is false", function (done) {
            var r1 = new Range({ low: "B", high: "C" });
            assert(!r1._contains("A"));
            done();
        });

        it("A,B contains C is false", function (done) {
            var r1 = new Range({ low: "A", high: "B" });
            assert(!r1._contains("C"));
            done();
        });
    });

    describe("_containsPoint", function () {
        var range = new Range({ low: 1, high: 3 });

        it("numbers, default comparison", function (done) {
            assert(range._containsPoint(20));
            done();
        });

        it("numbers, custom comparison", function (done) {

            assert(!range._containsPoint(20, function (a, b) {
                return a - b;
            }));

            done();
        });
    });

    describe("_containsRange", function () {
        var range = new Range({ low: 1, high: 3 });

        it("numbers, default comparison", function (done) {
            assert(range._containsRange({ low: 20, high: 29}));
            done();
        });

        it("numbers, custom comparison", function (done) {
            assert(!range._containsRange({ low: 20, high: 29 }, function (a, b) {
                return a - b;
            }));

            done();
        });
    });

    describe("_intersect", function () {
        var otherIsUndefinedOrNullTest = function (other, done) {
            var r = new Range();
            assert.throws(
                function () {
                    r._intersect(other);
                },
                    /Invalid Argument: 'other' is undefined or null/
            );
            done();
        };

        it("error - other is undefined", function (done) {
            otherIsUndefinedOrNullTest(undefined, done);
        });

        it("error - other is null", function (done) {
            otherIsUndefinedOrNullTest(null, done);
        });

        it("range intersect self is true - default range", function (done) {
            var r = new Range();
            assert(r._intersect(r));
            done();
        });

        it("R intersect R is true - non default range", function (done) {
            var r = new Range({ low: 1, high: "2" });
            assert(r._intersect(r));
            done();
        });

        it("A,D insersects B,C is true", function (done) {
            var r1 = new Range({ low: "A", high: "D" });
            var r2 = new Range({ low: "B", high: "C" });
            assert(r1._intersect(r2));
            done();
        });

        it("B,C insersects A,D is true", function (done) {
            var r1 = new Range({ low: "B", high: "C" });
            var r2 = new Range({ low: "A", high: "D" });
            assert(r1._intersect(r2));
            done();
        });

        it("A,C insersects B,D is true", function (done) {
            var r1 = new Range({ low: "A", high: "C" });
            var r2 = new Range({ low: "B", high: "D" });
            assert(r1._intersect(r2));
            assert(r2._intersect(r1));
            done();
        });

        it("B,D insersects A,C is true", function (done) {
            var r1 = new Range({ low: "B", high: "D" });
            var r2 = new Range({ low: "A", high: "C" });
            assert(r1._intersect(r2));
            done();
        });

        it("A,B insersects B,C is true", function (done) {
            var r1 = new Range({ low: "A", high: "B" });
            var r2 = new Range({ low: "B", high: "C" });
            assert(r1._intersect(r2));
            assert(r2._intersect(r1));
            done();
        });

        it("B,C insersects A,B is true", function (done) {
            var r1 = new Range({ low: "B", high: "C" });
            var r2 = new Range({ low: "A", high: "B" });
            assert(r1._intersect(r2));
            done();
        });

        it("A,B insersects C,D is false", function (done) {
            var r1 = new Range({ low: "A", high: "B" });
            var r2 = new Range({ low: "C", high: "D" });
            assert(!r1._intersect(r2));
            done();
        });

        it("C,D insersects A,B is false", function (done) {
            var r1 = new Range({ low: "C", high: "D" });
            var r2 = new Range({ low: "A", high: "B" });
            assert(!r1._intersect(r2));
            done();
        });
    });

    describe("_toString", function () {
        var toStringTest = function (options, expectedString, done) {
            var r = new Range(options);
            assert.strictEqual(r._toString(), expectedString);
            done();
        };

        it("undefined values", function (done) {
            toStringTest(undefined, "undefined,undefined", done);
        });
        it("null values", function (done) {
            toStringTest({ low: null }, "null,null", done);
        });
        it("NaN values", function (done) {
            toStringTest({ low: NaN }, "NaN,NaN", done);
        });
        it("number values", function (done) {
            toStringTest({ low: 1 }, "1,1", done);
        });
        it("string values", function (done) {
            toStringTest({ low: "a" }, "a,a", done);
        });
        it("boolean values", function (done) {
            toStringTest({ low: false, high: true }, "false,true", done);
        });
        it("object values", function (done) {
            toStringTest({ low: {} }, "[object Object],[object Object]", done);
        });
    });

    describe("_compare", function () {
        var r = new Range();

        var compareAsNumbers = function (a, b) {
            return a - b;
        }

        var constantCompareFunction = function (a, b) {
            return 0;
        };

        it("(undefined, undefined) === 0", function (done) {
            assert(r._compare() === 0);
            assert(r._compare(undefined) === 0);
            assert(r._compare(undefined, undefined) === 0);
            done();
        });

        it("(undefined, y) > 0", function (done) {
            assert(r._compare(undefined, null) > 0);
            assert(r._compare(undefined, -NaN) > 0);
            assert(r._compare(undefined, 0) > 0);
            assert(r._compare(undefined, NaN) > 0);
            assert(r._compare(undefined, true) > 0);
            assert(r._compare(undefined, false) > 0);
            assert(r._compare(undefined, "a") > 0);
            assert(r._compare(undefined, "undefined") > 0);
            assert(r._compare(undefined, "z") > 0);
            assert(r._compare(undefined, []) > 0);
            assert(r._compare(undefined, {}) > 0);
            assert(r._compare(undefined, 2, constantCompareFunction) > 0);
            assert(r._compare(undefined, 2, compareAsNumbers) > 0);

            done();
        });

        it("(x, undefined) < 0", function (done) {
            assert(r._compare(null) < 0);
            assert(r._compare(-NaN) < 0);
            assert(r._compare(0) < 0);
            assert(r._compare(NaN) < 0);
            assert(r._compare(true) < 0);
            assert(r._compare(false) < 0);
            assert(r._compare("a") < 0);
            assert(r._compare("undefined") < 0);
            assert(r._compare("z") < 0);
            assert(r._compare([]) < 0);
            assert(r._compare({}) < 0);
            assert(r._compare(1, undefined, constantCompareFunction) < 0);
            assert(r._compare(1, undefined, compareAsNumbers) < 0);
            done();
        });

        it("values as strings (default)", function (done) {
            assert(r._compare("A", "B") < 0);
            assert(r._compare("", "") === 0);
            assert(r._compare("B", "A") > 0);
            assert(r._compare("10", "2") < 0);
            assert(r._compare(10, "02") > 0);
            assert(r._compare(10, 2) < 0);
            assert(r._compare(null, "nulm") < 0);
            assert(r._compare(null, "null") === 0);
            assert(r._compare(null, "nulk") > 0);
            assert(r._compare(true, "truf") < 0);
            assert(r._compare(true, "true") === 0);
            assert(r._compare(true, "trud") > 0);
            assert(r._compare({}, "[object Object]") === 0);
            done();
        });

        it("values as numbers", function (done) {

            assert(r._compare(undefined, 2, compareAsNumbers) > 0);
            assert(r._compare(1, 2, compareAsNumbers) < 0);
            assert(r._compare(0, 0, compareAsNumbers) === 0);
            assert(r._compare(10, 2, compareAsNumbers) > 0);
            done();
        });

        it("always return 0", function (done) {
            assert(r._compare(1, 2, constantCompareFunction) === 0);
            assert(r._compare(2, 1, constantCompareFunction) === 0);
            done();
        });
    });

    describe("_isRange", function () {
        it("_isRange(undefined) is false", function (done) {
            assert(!Range._isRange());
            done();
        });

        it("_isRange(null) is false", function (done) {
            assert(!Range._isRange(null));
            done();
        });

        it("_isRange(non-object) is false", function (done) {
            var points = [
                undefined,
                null,
                1,
                "",
                true,
                NaN,
                function () {
                },
                {},
                {
                    low: ""
                }
            ];

            for (var i = 0; i < points.length; i++) {
                assert(!Range._isRange(points[i]));
            }

            done();
        });

        it("_isRange(point) is false", function (done) {
            var ranges = [
                {
                    low: "",
                    high: 1
                },
                new Range()
            ];

            for (var i = 0; i < ranges.length; i++) {
                assert(Range._isRange(ranges[i]));
            }

            done();
        });
    });
});
