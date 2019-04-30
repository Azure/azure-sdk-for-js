import * as assert from "assert";
import { Aborter } from "../src/aborter";

describe("Aborter", () => {
  it("should set value and get value successfully", async () => {
    const aborter = Aborter.none.withValue("mykey", "myvalue");
    assert.deepStrictEqual(aborter.getValue("mykey"), "myvalue");
  });
});
