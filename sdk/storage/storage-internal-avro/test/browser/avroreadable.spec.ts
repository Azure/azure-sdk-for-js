// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AvroReadableFromBlob } from "../../src/index.browser";
import { arraysEqual } from "../../src/utils/utils.common";
import { assert } from "chai";

describe("AvroReadableFromBlob", () => {
  const size = 1024;
  const u8arr = new Int8Array(size);
  for (let j = 0; j < size; j++) {
    u8arr[j] = j;
  }
  const blob = new Blob([u8arr]);

  it("read in sequence", async () => {
    const rfs = new AvroReadableFromBlob(blob);
    assert.equal(rfs.position, 0);

    const length = 10;
    let offset = 0;
    for (let i = 0; i < Math.floor(size / length); i++) {
      const buf = await rfs.read(length);
      assert.equal(rfs.position, offset + length);
      const expectedBuf = new Uint8Array(u8arr.buffer, offset, length);
      assert.ok(arraysEqual(buf, expectedBuf));
      offset += length;
    }

    const lastChunk = await rfs.read(length);
    assert.equal(rfs.position, blob.size);
    const expectedBuf = new Uint8Array(u8arr.buffer, offset, rfs.position - offset);
    assert.ok(arraysEqual(lastChunk, expectedBuf));

    const beyondChunk = await rfs.read(length);
    assert.equal(beyondChunk.byteLength, 0);
  });

  it("read in parallel", async () => {
    const rfs = new AvroReadableFromBlob(blob);
    assert.equal(rfs.position, 0);

    let offset = 0;
    const promiseArray = [];
    const len = 10;

    for (let i = 0; i < size / len; i++) {
      const length = Math.min(len, blob.size - offset);
      const readPromise = async (): Promise<void> => {
        const localOffset = offset;
        const buf = await rfs.read(length);
        const expectedBuf = new Uint8Array(u8arr.buffer, localOffset, length);
        assert.ok(arraysEqual(buf, expectedBuf));
      };

      promiseArray.push(readPromise());
      offset += length;
    }

    await Promise.all(promiseArray);
  });

  // doesn't work. read complete immediately
  it.skip("abort should throw AbortError", async () => {
    const largeSize = 1024 * 1024 * 1024;
    const largeArr = new Int8Array(largeSize);
    const largeBlob = new Blob([largeArr]);
    const rfs = new AvroReadableFromBlob(largeBlob);

    const aborter = new AbortController();
    const res = rfs.read(largeSize, { abortSignal: aborter.signal });
    aborter.abort();
    console.log(await res);
  });
});
