import assert from "assert";
import { Range, RangePartitionResolver } from "../../range";
import { CompareFunction } from "../../range";

describe("RangePartitionResolver", function() {
  describe("constructor", function() {
    // TODO: should split these up into individual tests
    it("missing partitionKeyExtractor throws", function() {
      const expetcedError = /Error: partitionKeyExtractor cannot be null or undefined/;

      assert.throws(function() {
        const r = new RangePartitionResolver(undefined, undefined);
      }, expetcedError);

      assert.throws(function() {
        const r = new RangePartitionResolver(undefined, undefined);
      }, expetcedError);

      assert.throws(function() {
        const r = new RangePartitionResolver(null, undefined);
      }, expetcedError);
    });

    it("invalid partitionKeyExtractor throws", function() {
      const expetcedError = /partitionKeyExtractor must be either a 'string' or a 'function'/;

      assert.throws(function() {
        const r = new RangePartitionResolver(0 as any, undefined);
      }, expetcedError);

      assert.throws(function() {
        const r = new RangePartitionResolver(true as any, undefined);
      }, expetcedError);

      assert.throws(function() {
        const r = new RangePartitionResolver(NaN as any, undefined);
      }, expetcedError);

      assert.throws(function() {
        const r = new RangePartitionResolver([] as any, undefined);
      }, expetcedError);

      assert.throws(function() {
        const r = new RangePartitionResolver({} as any, undefined);
      }, expetcedError);
    });

    it("missing partitionKeyMap throws", function() {
      const expectedError = /Error: partitionKeyMap cannot be null or undefined/;

      assert.throws(function() {
        const r = new RangePartitionResolver("", undefined);
      }, expectedError);

      assert.throws(function() {
        const r = new RangePartitionResolver(
          function() {
            /* no op */
          } as any,
          undefined
        );
      }, expectedError);

      assert.throws(function() {
        const r = new RangePartitionResolver("", null);
      }, expectedError);
    });

    it("invalid partitionKeyMap throws", function() {
      const expectedError = /Error: partitionKeyMap has to be an Array/;

      assert.throws(function() {
        const r = new RangePartitionResolver("", 0 as any);
      }, expectedError);

      assert.throws(function() {
        const r = new RangePartitionResolver("", "" as any);
      }, expectedError);

      assert.throws(function() {
        const r = new RangePartitionResolver("", true as any);
      }, expectedError);

      assert.throws(function() {
        const r = new RangePartitionResolver("", NaN as any);
      }, expectedError);

      assert.throws(function() {
        const r = new RangePartitionResolver("", {} as any);
      }, expectedError);

      const rpr = new RangePartitionResolver("", new Array());
    });

    it("valid RangePartitionResolver", function(done) {
      const resolver = new RangePartitionResolver("", []);
      assert(resolver);
      assert.strictEqual(resolver.partitionKeyExtractor, "");
      assert.deepEqual(resolver.partitionKeyMap, []);
      done();
    });
  });

  describe("getFirstContainingMapEntryOrNull", function() {
    it("getFirstContainingMapEntryOrNull - empty map returns null", function(done) {
      const ranges = [undefined, null, 0, "", true, [], {}, NaN, new Range()];
      const resolver = new RangePartitionResolver("", []);
      ranges.forEach(function(r) {
        const result = resolver.getFirstContainingMapEntryOrNull(r);
        assert.equal(result, null);
      });
      done();
    });

    it("_tryGetContainingRange - map with no containing entry returns null", function(done) {
      const mapEntry = { range: new Range({ low: "A" }), link: "link1" };
      const resolver = new RangePartitionResolver("key", [mapEntry]);
      const result = resolver.getFirstContainingMapEntryOrNull(new Range({ low: "B" }));
      assert.equal(result, null);
      done();
    });

    it("_tryGetContainingRange - map with single containing entry returns entry", function(done) {
      const mapEntry = { range: new Range(), link: "link1" };
      const resolver = new RangePartitionResolver("key", [mapEntry]);
      const result = resolver.getFirstContainingMapEntryOrNull(new Range());
      assert.deepEqual(result, { range: new Range(), link: "link1" });
      done();
    });

    it("_tryGetContainingRange - map with more multiple containing entries returns first entry", function(done) {
      const map1 = [
        { range: new Range({ low: "A", high: "B" }), link: "link1" },
        { range: new Range({ low: "A" }), link: "link2" }
      ];

      const resolver1 = new RangePartitionResolver("key", map1);
      const result1 = resolver1.getFirstContainingMapEntryOrNull(new Range({ low: "A" }));
      assert.strictEqual(result1.link, "link1");

      const map2 = [
        { range: new Range({ low: "A" }), link: "link2" },
        { range: new Range({ low: "A", high: "Z" }), link: "link1" }
      ];

      const resolver2 = new RangePartitionResolver("key", map2);
      const result2 = resolver2.getFirstContainingMapEntryOrNull(new Range({ low: "A" }));
      assert.strictEqual(result2.link, "link2");
      done();
    });
  });

  describe("resolveForCreate", function() {
    it("_tryGetContainingRange - map containing parition key returns corresponding link", function(done) {
      const resolver = new RangePartitionResolver("key", [
        { range: new Range({ low: "A", high: "M" }), link: "link1" },
        { range: new Range({ low: "N", high: "Z" }), link: "link2" }
      ]);
      const result = resolver.resolveForCreate("X");
      assert.strictEqual(result, "link2");
      done();
    });

    it("_tryGetContainingRange - map not containing parition key throws", function(done) {
      const resolver = new RangePartitionResolver("key", [
        { range: new Range({ low: "A", high: "M" }), link: "link1" }
      ]);

      assert.throws(function() {
        const result = resolver.resolveForCreate("X");
      }, /Error: Invalid operation: A containing range for 'X,X' doesn't exist in the partition map./);
      done();
    });
  });

  const resolveForReadTest = function(resolver: any, partitionKey: any, expectedLinks: any) {
    const result = resolver.resolveForRead(partitionKey);
    assert.deepEqual(expectedLinks, result);
  };

  describe("resolveForRead", function() {
    const resolver = new RangePartitionResolver(
      function(doc: any) {
        // TODO: any
        return doc.key;
      },
      [
        {
          range: new Range({ low: "A", high: "M" }),
          link: "link1"
        },
        {
          range: new Range({ low: "N", high: "Z" }),
          link: "link2"
        }
      ]
    );

    it("undefined", function(done) {
      const partitionKey: any = undefined;
      const expectedLinks = ["link1", "link2"];
      resolveForReadTest(resolver, partitionKey, expectedLinks);
      done();
    });

    it("null", function(done) {
      const partitionKey: any = null;
      const expectedLinks = ["link1", "link2"];
      resolveForReadTest(resolver, partitionKey, expectedLinks);
      done();
    });
  });

  describe("resolveForRead string", function() {
    const resolver = new RangePartitionResolver(
      function(doc: any) {
        // TODO: any
        return doc.key;
      },
      [
        {
          range: new Range({ low: "A", high: "M" }),
          link: "link1"
        },
        {
          range: new Range({ low: "N", high: "Z" }),
          link: "link2"
        }
      ]
    );

    it("point", function(done) {
      const partitionKey = new Range({ low: "D" });
      const expectedLinks = ["link1"];
      resolveForReadTest(resolver, partitionKey, expectedLinks);

      const partitionKey2 = new Range({ low: "Q" });
      const expectedLinks2 = ["link2"];
      resolveForReadTest(resolver, partitionKey2, expectedLinks2);
      done();
    });

    it("range", function(done) {
      const partitionKey = new Range({ low: "D", high: "Q" });
      const expectedLinks = ["link1", "link2"];
      resolveForReadTest(resolver, partitionKey, expectedLinks);
      done();
    });

    it("array of ranges", function(done) {
      const partitionKey = [new Range({ low: "A", high: "B" }), new Range({ low: "Q" })];
      const expectedLinks = ["link1", "link2"];
      resolveForReadTest(resolver, partitionKey, expectedLinks);
      done();
    });
  });

  describe("resolveForRead number", function() {
    const partitionKeyExtractor = function(doc: any) {
      return doc.key;
    };

    const partitionKeyMap = [
      {
        range: new Range({ low: 1, high: 15 }),
        link: "link1"
      },
      {
        range: new Range({ low: 16, high: 30 }),
        link: "link2"
      }
    ];

    it("point, default compareFunction", function(done) {
      const resolver = new RangePartitionResolver(partitionKeyExtractor, partitionKeyMap);

      const partitionKey = new Range({ low: 2 });
      const expectedLinks = ["link2"];

      resolveForReadTest(resolver, partitionKey, expectedLinks);
      done();
    });

    it("point, custom compareFunction", function(done) {
      const resolver = new RangePartitionResolver(partitionKeyExtractor, partitionKeyMap, function(
        a: number,
        b: number
      ) {
        return a - b;
      });

      const partitionKey = new Range({ low: 2 });
      const expectedLinks = ["link1"];

      resolveForReadTest(resolver, partitionKey, expectedLinks);
      done();
    });
  });

  describe("compareFunction", function() {
    const invalidCompareFunctionTest = function(compareFunction: any) {
      assert.throws(function() {
        const resolver = new RangePartitionResolver(
          "key",
          [{ range: new Range({ low: "A" }), link: "link1" }],
          compareFunction
        );
      }, /Invalid argument: 'compareFunction' is not a function/);
    };

    it("invalid compareFunction - null", function() {
      const compareFunction: CompareFunction = null;
      invalidCompareFunctionTest(compareFunction);
    });

    it("invalid compareFunction - string", function() {
      const compareFunction = "";
      invalidCompareFunctionTest(compareFunction);
    });

    it("invalid compareFunction - number", function() {
      const compareFunction = 0;
      invalidCompareFunctionTest(compareFunction);
    });

    it("invalid compareFunction - boolean", function() {
      const compareFunction = false;
      invalidCompareFunctionTest(compareFunction);
    });

    it("invalid compareFunction - object", function() {
      const compareFunction = {};
      invalidCompareFunctionTest(compareFunction);
    });

    it("compareFunction throws", function() {
      const resolver = new RangePartitionResolver("key", [{ range: new Range({ low: "A" }), link: "link1" }], function(
        a,
        b
      ) {
        throw new Error("Compare error");
      });

      assert.throws(function() {
        const result = (resolver as any).resolveForRead("A", ["link1"]); // TODO: any
      }, /Error: Compare error/);
    });
  });
});
