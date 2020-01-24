import { assert } from "chai";
import * as lib from "../src/index";

describe("Hello world", () => {
  it("should say hello world", () => {
    const result = lib.helloWorld();
    assert.strictEqual(result, "Hello world");
  });
});
