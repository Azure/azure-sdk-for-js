import assert from "assert";
import { Range } from "../../range";

describe("Range Tests", function() {
  describe("constructor", function() {
    const invalidOptionsTest = function(options: any, expectedError: any) {
      assert.throws(function() {
        const r = new Range(options);
      }, expectedError);
    };

    const optionsIsNullTest = function(options: any) {
      invalidOptionsTest(options, /Invalid argument: 'options' is null/);
    };

    const optionsIsNotAnObjectTest = function(options: any) {
      invalidOptionsTest(options, /Invalid argument: 'options' is not an object/);
    };

    const invalidRangeTest = function(options: any) {
      invalidOptionsTest(options, /Invalid argument: 'options.low' must be less than or equal than 'options.high'/);
    };

    it("options - undefined (ommited argument)", function() {
      assert(new Range());
    });

    it("options - undefined (literal argument)", function() {
      assert(new Range(undefined));
    });

    it("options - null ", function() {
      const options: any = null;
      optionsIsNullTest(options);
    });

    it("options - number", function() {
      const options = 0;
      optionsIsNotAnObjectTest(options);
    });

    it("invalid options - string", function() {
      const options = "";
      optionsIsNotAnObjectTest(options);
    });

    it("invalid options - boolean", function() {
      const options = false;
      optionsIsNotAnObjectTest(options);
    });

    it("Range instances are frozen", function() {
      const r = new Range();

      try {
        (r as any).compareFunction = 1;
        assert.fail("Must throw");
      } catch (err) {
        assert(err.message.includes("add property compareFunction, object is not extensible"));
      }
    });
  });

  describe("_contains", function() {
    it("undefined,undefined contains undefined is true", function() {
      const r = new Range();
      assert(r._contains(undefined));
    });

    it("undefined,undefined contains null is false", function() {
      const r = new Range();
      assert(!r._contains(null));
    });

    it("null,null contains undefined is true", function() {
      const r = new Range({ low: null });
      assert(r._contains(null));
    });

    it("null,null contains null is true", function() {
      const r = new Range({ low: null });
      assert(r._contains(null));
    });

    it("range contains self is true - default range", function() {
      const r = new Range();
      assert(r._contains(r));
    });

    it("range contains self is true - non-default range", function() {
      const r = new Range({ low: "A" });
      assert(r._contains(r));
    });

    it("A,D contains B,C is true", function() {
      const r1 = new Range({ low: "A", high: "D" });
      const r2 = new Range({ low: "B", high: "C" });
      assert(r1._contains(r2));
    });

    it("B,C contains A,D is false", function() {
      const r1 = new Range({ low: "B", high: "C" });
      const r2 = new Range({ low: "A", high: "D" });
      assert(!r1._contains(r2));
    });

    it("A,C contains B,D is false", function() {
      const r1 = new Range({ low: "A", high: "C" });
      const r2 = new Range({ low: "B", high: "D" });
      assert(!r1._contains(r2));
    });

    it("B,D contains A,C is false", function() {
      const r1 = new Range({ low: "B", high: "D" });
      const r2 = new Range({ low: "A", high: "C" });
      assert(!r1._contains(r2));
    });

    it("A,B contains B,C is false", function() {
      const r1 = new Range({ low: "A", high: "B" });
      const r2 = new Range({ low: "B", high: "C" });
      assert(!r1._contains(r2));
    });

    it("B,C contains A,B is false", function() {
      const r1 = new Range({ low: "B", high: "C" });
      const r2 = new Range({ low: "A", high: "B" });
      assert(!r1._contains(r2));
    });

    it("A,B contains C,D is false", function() {
      const r1 = new Range({ low: "A", high: "B" });
      const r2 = new Range({ low: "C", high: "D" });
      assert(!r1._contains(r2));
    });

    it("C,D contains A,B is false", function() {
      const r1 = new Range({ low: "C", high: "D" });
      const r2 = new Range({ low: "A", high: "B" });
      assert(!r1._contains(r2));
    });

    it("A,C contains B is true", function() {
      const r1 = new Range({ low: "A", high: "C" });
      assert(r1._contains("B"));
    });

    it("B,C contains A is false", function() {
      const r1 = new Range({ low: "B", high: "C" });
      assert(!r1._contains("A"));
    });

    it("A,B contains C is false", function() {
      const r1 = new Range({ low: "A", high: "B" });
      assert(!r1._contains("C"));
    });
  });

  describe("_containsPoint", function() {
    const range = new Range({ low: 1, high: 3 });

    it("numbers, default comparison", function() {
      assert(range._containsPoint(20));
    });

    it("numbers, custom comparison", function() {
      assert(
        !range._containsPoint(20, function(a, b) {
          return a > b ? 1 : -1;
        })
      );
    });
  });

  describe("_containsRange", function() {
    const range = new Range({ low: 1, high: 3 });

    it("numbers, default comparison", function() {
      assert(range._containsRange(new Range({ low: 20, high: 29 })));
    });

    it("numbers, custom comparison", function() {
      assert(
        !range._containsRange(new Range({ low: 20, high: 29 }), function(a, b) {
          return a > b ? 1 : -1;
        })
      );
    });
  });

  describe("_intersect", function() {
    const otherIsUndefinedOrNullTest = function(other: any) {
      const r = new Range();
      assert.throws(function() {
        r._intersect(other);
      }, /Invalid Argument: 'other' is undefined or null/);
    };

    it("error - other is undefined", function() {
      otherIsUndefinedOrNullTest(undefined);
    });

    it("error - other is null", function() {
      otherIsUndefinedOrNullTest(null);
    });

    it("range intersect self is true - default range", function() {
      const r = new Range();
      assert(r._intersect(r));
    });

    it("R intersect R is true - non default range", function() {
      const r = new Range({ low: 1, high: "2" });
      assert(r._intersect(r));
    });

    it("A,D insersects B,C is true", function() {
      const r1 = new Range({ low: "A", high: "D" });
      const r2 = new Range({ low: "B", high: "C" });
      assert(r1._intersect(r2));
    });

    it("B,C insersects A,D is true", function() {
      const r1 = new Range({ low: "B", high: "C" });
      const r2 = new Range({ low: "A", high: "D" });
      assert(r1._intersect(r2));
    });

    it("A,C insersects B,D is true", function() {
      const r1 = new Range({ low: "A", high: "C" });
      const r2 = new Range({ low: "B", high: "D" });
      assert(r1._intersect(r2));
      assert(r2._intersect(r1));
    });

    it("B,D insersects A,C is true", function() {
      const r1 = new Range({ low: "B", high: "D" });
      const r2 = new Range({ low: "A", high: "C" });
      assert(r1._intersect(r2));
    });

    it("A,B insersects B,C is true", function() {
      const r1 = new Range({ low: "A", high: "B" });
      const r2 = new Range({ low: "B", high: "C" });
      assert(r1._intersect(r2));
      assert(r2._intersect(r1));
    });

    it("B,C insersects A,B is true", function() {
      const r1 = new Range({ low: "B", high: "C" });
      const r2 = new Range({ low: "A", high: "B" });
      assert(r1._intersect(r2));
    });

    it("A,B insersects C,D is false", function() {
      const r1 = new Range({ low: "A", high: "B" });
      const r2 = new Range({ low: "C", high: "D" });
      assert(!r1._intersect(r2));
    });

    it("C,D insersects A,B is false", function() {
      const r1 = new Range({ low: "C", high: "D" });
      const r2 = new Range({ low: "A", high: "B" });
      assert(!r1._intersect(r2));
    });
  });

  describe("_toString", function() {
    const toStringTest = function(options: any, expectedString: any) {
      const r = new Range(options);
      assert.strictEqual(r._toString(), expectedString);
    };

    it("undefined values", function() {
      toStringTest(undefined, "undefined,undefined");
    });
    it("null values", function() {
      toStringTest({ low: null }, "null,null");
    });
    it("NaN values", function() {
      toStringTest({ low: NaN }, "NaN,NaN");
    });
    it("number values", function() {
      toStringTest({ low: 1 }, "1,1");
    });
    it("string values", function() {
      toStringTest({ low: "a" }, "a,a");
    });
    it("boolean values", function() {
      toStringTest({ low: false, high: true }, "false,true");
    });
    it("object values", function() {
      toStringTest({ low: {} }, "[object Object],[object Object]");
    });
  });

  describe("_compare", function() {
    const r = new Range();

    const compareAsNumbers = function(a: any, b: any) {
      return a - b;
    };

    const constantCompareFunction = function(a: any, b: any) {
      return 0;
    };

    it("(undefined, undefined) === 0", function() {
      // assert(r._compare() === 0);
      // assert(r._compare(undefined) === 0);
      assert(r._compare(undefined, undefined) === 0);
    });

    it("(undefined, y) > 0", function() {
      assert(r._compare(undefined, null) > 0);
      assert(r._compare(undefined, -NaN) > 0);
      assert(r._compare(undefined, 0) > 0);
      assert(r._compare(undefined, NaN) > 0);
      assert(r._compare(undefined, true as any) > 0);
      assert(r._compare(undefined, false as any) > 0);
      assert(r._compare(undefined, "a") > 0);
      assert(r._compare(undefined, "undefined") > 0);
      assert(r._compare(undefined, "z") > 0);
      assert(r._compare(undefined, [] as any) > 0);
      assert(r._compare(undefined, {} as any) > 0);
      assert(r._compare(undefined, 2, constantCompareFunction) > 0);
      assert(r._compare(undefined, 2, compareAsNumbers) > 0);
    });

    it("(x, undefined) < 0", function() {
      assert(r._compare(null, undefined) < 0);
      assert(r._compare(-NaN, undefined) < 0);
      assert(r._compare(0, undefined) < 0);
      assert(r._compare(NaN, undefined) < 0);
      assert(r._compare(true as any, undefined) < 0);
      assert(r._compare(false as any, undefined) < 0);
      assert(r._compare("a", undefined) < 0);
      assert(r._compare("undefined", undefined) < 0);
      assert(r._compare("z", undefined) < 0);
      assert(r._compare([] as any, undefined) < 0);
      assert(r._compare({} as any, undefined) < 0);
      assert(r._compare(1, undefined, constantCompareFunction) < 0);
      assert(r._compare(1, undefined, compareAsNumbers) < 0);
    });

    it("values as strings (default)", function() {
      assert(r._compare("A", "B") < 0);
      assert(r._compare("", "") === 0);
      assert(r._compare("B", "A") > 0);
      assert(r._compare("10", "2") < 0);
      assert(r._compare(10, "02") > 0);
      assert(r._compare(10, 2) < 0);
      assert(r._compare(null, "nulm") < 0);
      assert(r._compare(null, "null") === 0);
      assert(r._compare(null, "nulk") > 0);
      assert(r._compare(true as any, "truf") < 0);
      assert(r._compare(true as any, "true") === 0);
      assert(r._compare(true as any, "trud") > 0);
      assert(r._compare({} as any, "[object Object]") === 0);
    });

    it("values as numbers", function() {
      assert(r._compare(undefined, 2, compareAsNumbers) > 0);
      assert(r._compare(1, 2, compareAsNumbers) < 0);
      assert(r._compare(0, 0, compareAsNumbers) === 0);
      assert(r._compare(10, 2, compareAsNumbers) > 0);
    });

    it("always return 0", function() {
      assert(r._compare(1, 2, constantCompareFunction) === 0);
      assert(r._compare(2, 1, constantCompareFunction) === 0);
    });
  });

  describe("_isRange", function() {
    it("_isRange(undefined) is false", function() {
      assert(!Range._isRange(undefined));
    });

    it("_isRange(null) is false", function() {
      assert(!Range._isRange(null));
    });

    it("_isRange(non-object) is false", function() {
      const points: any[] = [
        undefined,
        null,
        1,
        "",
        true,
        NaN,
        function() {
          /* no op */
        },
        {},
        {
          low: ""
        }
      ];

      for (const point of points) {
        assert(!Range._isRange(point));
      }
    });

    it("_isRange(point) is false", function() {
      const ranges: any[] = [
        {
          low: "",
          high: 1
        }
        // new Range(), // TODO: this was here, but _isRange just tests for if it's instanceof
      ];

      for (const range of ranges) {
        assert(!Range._isRange(range));
      }
    });
  });
});
