import assert from "assert";
import { isResourceValid } from "../../dist-esm/common";

describe("Helper methods", function() {
  describe("isResourceValid Unit Tests", function() {
    it("id is not string", function(done) {
      const err = {};
      const result = isResourceValid({ id: 1 }, err);

      assert.equal(result, false);
      assert.deepEqual(err, { message: "Id must be a string." });
      done();
    });
  });
});
