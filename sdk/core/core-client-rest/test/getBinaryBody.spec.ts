import { assert } from "chai";
import { decodeBinaryContent, encodeBinaryContent } from "../src/helpers/getBinaryBody";

describe("getBinaryBody", () => {
  describe("decodeBinaryContent", () => {
    it("should handle string content", () => {
      const decoded = decodeBinaryContent("foo");
      assert.equal(decoded, "foo");
    });

    it("should handle uint8array content", () => {
      const decoded = decodeBinaryContent(new Uint8Array([0x66, 0x6f, 0x6f]));
      assert.equal(decoded, "foo");
    });

    it("should handle object content", () => {
      const testObject = { foo: "bar" };
      const decoded = decodeBinaryContent(testObject);
      assert.equal(decoded, JSON.stringify(testObject));
    });
  });

  describe("encodeBinaryContent", () => {
    it("should handle encode a string to uint8array", () => {
      const decoded = encodeBinaryContent("foo");
      assert.deepEqual(decoded, new Uint8Array([0x66, 0x6f, 0x6f]));
    });
  });
});
