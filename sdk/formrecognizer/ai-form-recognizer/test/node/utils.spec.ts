// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { toRequestBody } from "../../src/common";
import { PassThrough } from "stream";
import { streamToBuffer } from "../../src/utils/utils.node";

describe("toRequestBody() NodeJS only", () => {
  it("cache readable stream to Buffer", async () => {
    const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    const bufferStream = new PassThrough();
    bufferStream.end(buf);

    const result = (await toRequestBody(bufferStream)) as Buffer;

    assert.equal(
      Buffer.compare(result, buf),
      0,
      "Expected the result buffer to have the same binary data"
    );
  });
}).timeout(60000);

describe("utils NodeJS only", () => {
  it("streamToBuffer() should work when input is smaller than 1 MB", async () => {
    const dataLength = 1 * 1024 * 1024 - 5;
    const data = Buffer.alloc(dataLength);
    data.fill("a");

    const bufferStream = new PassThrough();
    bufferStream.end(data);

    const result = (await streamToBuffer(bufferStream, 3 * 1024 * 1024)) as Buffer;

    assert.equal(result.byteLength, dataLength);
  });

  it("streamToBuffer() should work when input is larger than 1 MB", async () => {
    const dataLength = 2 * 1024 * 1024 - 5;
    const data = Buffer.alloc(dataLength);
    data.fill("a");

    const bufferStream = new PassThrough();
    bufferStream.end(data);

    const result = (await streamToBuffer(bufferStream, 3 * 1024 * 1024)) as Buffer;

    assert.equal(result.byteLength, dataLength);
  });

  it("streamToBuffer() should work when internal buffer expands multiple times", async () => {
    const dataLength = 7 * 1024 * 1024;
    const data = Buffer.alloc(dataLength);
    data.fill("a");

    const bufferStream = new PassThrough();
    bufferStream.end(data);

    const result = (await streamToBuffer(bufferStream, 8 * 1024 * 1024)) as Buffer;

    assert.equal(result.byteLength, dataLength);
  });

  it("streamToBuffer() should work when input is multiple of 1 MB", async () => {
    const dataLength = 2 * 1024 * 1024;
    const data = Buffer.alloc(dataLength);
    data.fill("a");

    const bufferStream = new PassThrough();
    bufferStream.end(data);

    const result = (await streamToBuffer(bufferStream, 3 * 1024 * 1024)) as Buffer;

    assert.equal(result.byteLength, dataLength);
  });

  it("streamToBuffer() should work  when input is slightly less than max allowed", async () => {
    const dataLength = 3 * 1024 * 1024 - 1;
    const data = Buffer.alloc(dataLength);
    data.fill("a");

    const bufferStream = new PassThrough();
    bufferStream.end(data);

    const result = (await streamToBuffer(bufferStream, 3 * 1024 * 1024)) as Buffer;

    assert.equal(result.byteLength, dataLength);
  });

  it("streamToBuffer() should work when input has the same size as max size", async () => {
    const dataLength = 3 * 1024 * 1024;
    const data = Buffer.alloc(dataLength);
    data.fill("a");

    const bufferStream = new PassThrough();
    bufferStream.end(data);

    const result = (await streamToBuffer(bufferStream, 3 * 1024 * 1024)) as Buffer;

    assert.equal(result.byteLength, dataLength);
  });

  it("streamToBuffer() should throw if input size is larger than max size", async () => {
    const dataLength = 3 * 1024 * 1024;
    const data = Buffer.alloc(dataLength);
    data.fill("a");

    const bufferStream = new PassThrough({ highWaterMark: 20 * 1024 });
    bufferStream.end(data);

    try {
      await streamToBuffer(bufferStream, 2 * 1024 * 1024);
      throw new Error("An error should have been thrown");
    } catch (err) {
      assert.equal(
        (err as Error).message,
        `Input stream exceeds maximum allowed size: ${2 * 1024 * 1024}`
      );
    }
  });
}).timeout(60000);
