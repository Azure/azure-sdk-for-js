import * as assert from "assert";
import { HashPartitionResolver } from "../../hash";
import { PartitionKeyExtractor } from "../../range";

describe("HashPartitionResolver", function() {
  describe("new()", function() {
    it(" does not throw", function() {
      assert.doesNotThrow(function() {
        const resolver = new HashPartitionResolver("foo", ["dbs/foo/colls/A"]);
      });
    });

    it("invalid partitionKeyResolver", function() {
      assert.throws(function() {
        const resolver = new HashPartitionResolver(undefined, undefined);
      }, /partitionKeyExtractor cannot be null or undefined/);
    });

    it("invalid collectionLinks", function() {
      assert.throws(function() {
        const resolver = new HashPartitionResolver("foo", undefined);
      }, /collectionLinks must be an array./);
    });
  });

  describe("#.getPartitionKey", function() {
    it("string", function() {
      const resolver = new HashPartitionResolver("foo", ["dbs/foo/colls/A"]);
      const partitionKey = resolver.getPartitionKey({ foo: "bar" });
      assert.strictEqual("bar", partitionKey);
    });

    it("function", function() {
      const resolver = new HashPartitionResolver((document: any) => document.foo, ["dbs/foo/colls/A"]);
      const partitionKey = resolver.getPartitionKey({ foo: "bar" });
      assert.strictEqual("bar", partitionKey);
    });
  });

  describe("#.resolveForRead", function() {
    it("valid key", function() {
      const resolver = new HashPartitionResolver("ignored", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
      const links = resolver.resolveForRead("a");
      assert.deepEqual(["dbs/foo/colls/A"], links);
    });

    it("null key", function() {
      const resolver = new HashPartitionResolver("ignored", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
      const links = resolver.resolveForRead(null);
      assert.deepEqual(links, ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
    });

    it("undefined key", function() {
      const resolver = new HashPartitionResolver("ignored", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
      const links = resolver.resolveForRead(undefined);
      assert.deepEqual(links, ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
    });
  });

  describe("#.resolveForCreate", function() {
    it("valid key", function() {
      const resolver = new HashPartitionResolver("ignored", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
      const links = resolver.resolveForCreate("a");
      assert.deepEqual("dbs/foo/colls/A", links);
    });

    it("invalid key", function() {
      const resolver = new HashPartitionResolver("ignored", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
      assert.throws(function() {
        resolver.resolveForCreate(0 as any); // Any to force the type error
      }, /partitionKey must be a 'string'/);
    });
  });

  // TODO: should consider removing these tests. This is implemention details...
  describe("#._resolve", function() {
    it("throws", function() {
      const resolver = new HashPartitionResolver((document: any) => document.foo, ["dbs/foo/colls/A"]);
      assert.throws(
        function() {
          resolver._resolve(1 as any);
        }, // Any to force the type error
        /partitionKey must be a 'string'/
      );
    });

    it("resolves to non-null", function() {
      const resolver = new HashPartitionResolver("ignoredPartitionKeyExtractor", [
        "dbs/foo/colls/A",
        "dbs/foo/colls/B",
        "dbs/foo/colls/C"
      ]);
      const link = resolver._resolve("x");
      assert.notStrictEqual(null, link);
    });
  });

  describe("#._throwIfInvalidCollectionLinks", function() {
    it("non-array throws", function() {
      const links = [
        undefined,
        null,
        1,
        "foo",
        {},
        NaN,
        function() {
          /* no op[ */
        }
      ];

      links.forEach(function(link) {
        assert.throws(function() {
          HashPartitionResolver._throwIfInvalidCollectionLinks(link as any);
        }, /collectionLinks must be an array./);
      });
    });

    it("invalid links throws", function() {
      assert.throws(function() {
        HashPartitionResolver._throwIfInvalidCollectionLinks(["foo"]);
      }, /All elements of collectionLinks must be collection links./);
    });

    it("does not throw", function() {
      assert.doesNotThrow(function() {
        HashPartitionResolver._throwIfInvalidCollectionLinks(["dbs/a/colls/b"]);
      });
    });
  });

  describe("#._throwIfInvalidPartitionKeyExtractor", function() {
    it(" does not throw", function() {
      const partitionKeyExtractors = [
        "foo",
        function() {
          /* no op */
        }
      ];

      partitionKeyExtractors.forEach(function(partitionKeyExtractor) {
        assert.doesNotThrow(function() {
          // Any to force the error
          HashPartitionResolver._throwIfInvalidPartitionKeyExtractor(partitionKeyExtractor as any);
        });
      });
    });

    it("null or undefined throws", function() {
      const partitionKeyExtractors: any = [undefined, null];

      partitionKeyExtractors.forEach(function(partitionKeyExtractor: any) {
        assert.throws(function() {
          HashPartitionResolver._throwIfInvalidPartitionKeyExtractor(partitionKeyExtractor);
        }, /partitionKeyExtractor cannot be null or undefined/);
      });
    });

    it("throws", function() {
      const partitionKeyExtractors = [1, {}, [], NaN];

      partitionKeyExtractors.forEach(function(partitionKeyExtractor: any) {
        assert.throws(function() {
          HashPartitionResolver._throwIfInvalidPartitionKeyExtractor(partitionKeyExtractor);
        }, /partitionKeyExtractor must be either a 'string' or a 'function/);
      });
    });
  });

  describe("#._throwIfInvalidPartitionKey", function() {
    it(" does not throw", function() {
      assert.doesNotThrow(function() {
        HashPartitionResolver._throwIfInvalidPartitionKey("foo" as any);
      });
    });

    it("throws", function() {
      const keys = [
        undefined,
        null,
        1,
        {},
        [],
        NaN,
        function() {
          /* no op */
        }
      ];

      keys.forEach(key => {
        assert.throws(() => {
          HashPartitionResolver._throwIfInvalidPartitionKey(key as any);
        }, /partitionKey must be a 'string'/);
      });
    });
  });
});
