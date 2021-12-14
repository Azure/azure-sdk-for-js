// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import { assert } from "chai";
import { AvroReadableFromStream } from "../../src";
import { AbortController } from "@azure/abort-controller";
import { Readable } from "stream";

describe("AvroReadableFromStream", () => {
  it("read pass end should throw", async () => {
    const rs = fs.createReadStream("../README.md");

    const rfs = new AvroReadableFromStream(rs);
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

  it("abort read should work", async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const delayedReadable = new Readable({ read() {} });
    const rfs = new AvroReadableFromStream(delayedReadable);

    let AbortErrorCaught = false;
    try {
      await rfs.read(100000, { abortSignal: AbortController.timeout(1) });
    } catch (err) {
      if (err.name === "AbortError") {
        AbortErrorCaught = true;
      }
    }
    assert.ok(AbortErrorCaught);
  });

  it("abort after read should not throw", async () => {
    const rs = fs.createReadStream("../README.md");
    const rfs = new AvroReadableFromStream(rs);

    const aborter = new AbortController();
    await rfs.read(10, { abortSignal: aborter.signal });
    aborter.abort();
  });
});
