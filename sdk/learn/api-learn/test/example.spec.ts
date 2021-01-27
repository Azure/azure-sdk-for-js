import { assert } from "chai";
import { helloWorld } from "../src";

describe("helloWorld", () => {
  it("returns hello world", () => {
    assert.strictEqual(helloWorld(), "Hello World!");
  });
});
