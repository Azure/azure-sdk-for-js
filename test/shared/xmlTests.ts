import { parseXML } from "../../lib/util/xml";
import * as assert from "assert";

describe("XML serializer", function () {
  it("should parse basic XML", async function() {
    const res = await parseXML("<foo>42</foo>");
    assert.equal(res, 42);
  });

  it("should handle errors gracefully", async function () {
    try {
      await parseXML("INVALID");
      throw new Error("did not throw");
    } catch (err) {
      if (err.message === "did not throw") {
        throw err;
      }
    }
  });
});
