import * as fs from "fs";
import * as assert from "assert";
import { ReadableFromStream } from "../src";

describe("ReadableFromStream", () => {
  it("read pass end should throw", async () => {
    let rs = fs.createReadStream("../README.md");

    let rfs = new ReadableFromStream(rs);
    assert.equal(rfs.position, 0);

    await rfs.read(10);
    assert.equal(rfs.position, 10);
    await rfs.read(100000);

    let exceptionCaught = false;
    try {
      await rfs.read(10);
    } catch (err) {
      assert.equal(err.message, "Stream no longer readable.");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });
});
