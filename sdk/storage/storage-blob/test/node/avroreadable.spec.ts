// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import { AvroReadableFromStream } from "$internal/internal-avro/index.js";
import { Readable } from "node:stream";
import { describe, it, assert } from "vitest";

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
    } catch (err: any) {
      assert.equal(err.message, "Stream no longer readable.");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("abort read should work", async () => {
    const delayedReadable = new Readable({ read() {} });
    const rfs = new AvroReadableFromStream(delayedReadable);

    let AbortErrorCaught = false;
    try {
      await rfs.read(100000, { abortSignal: AbortSignal.timeout(1) });
    } catch (err: any) {
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
