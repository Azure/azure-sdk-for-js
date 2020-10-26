// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getContentType, toRequestBody } from "../../src/common";

describe("getContentType()", () => {
  it("identifies ArrayBuffer of application/pdf", async () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([0x25, 0x50, 0x44, 0x46]);

    const result = await getContentType(buffer);
    assert.equal(result, "application/pdf");
  });

  it("identifies ArrayBufferView of application/pdf", async () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([0x25, 0x50, 0x44, 0x46]);

    const result = await getContentType(view);
    assert.equal(result, "application/pdf");
  });

  it("identifies ArrayBuffer of image/jpeg", async () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([0xff, 0xd8, 0x0, 0x0]);

    const result = await getContentType(buffer);
    assert.equal(result, "image/jpeg");
  });

  it("identifies ArrayBufferView of image/jpeg", async () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([0xff, 0xd8, 0x0, 0x0]);

    const result = await getContentType(view);
    assert.equal(result, "image/jpeg");
  });

  it("identifies ArrayBuffer of image/png", async () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([0x89, 0x50, 0x4e, 0x47]);

    const result = await getContentType(buffer);
    assert.equal(result, "image/png");
  });

  it("identifies ArrayBufferView of image/png", async () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([0x89, 0x50, 0x4e, 0x47]);

    const result = await getContentType(view);
    assert.equal(result, "image/png");
  });

  it("identifies ArrayBuffer of image/tiff little-endian", async () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([0x49, 0x49, 0x2a, 0x0]);

    const result = await getContentType(buffer);
    assert.equal(result, "image/tiff");
  });

  it("identifies ArrayBufferView of image/tiff little-endian", async () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([0x49, 0x49, 0x2a, 0x0]);

    const result = await getContentType(view);
    assert.equal(result, "image/tiff");
  });

  it("identifies ArrayBuffer of image/tiff big-endian", async () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([0x4d, 0x4d, 0x0, 0x2a]);

    const result = await getContentType(buffer);
    assert.equal(result, "image/tiff");
  });

  it("identifies ArrayBufferView of image/tiff big-endian", async () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([0x4d, 0x4d, 0x0, 0x2a]);

    const result = await getContentType(view);
    assert.equal(result, "image/tiff");
  });

  it("throws error with input of byte length less than 4", async () => {
    const buffer = new ArrayBuffer(2);
    const view = new Uint8Array(buffer);
    view.set([0xff, 0xd8]);

    try {
      await getContentType(buffer);
      throw new Error("An error should have already been thrown");
    } catch (err) {
      assert.equal((err as Error).message, "Invalid input. Expect more than 4 bytes of data");
    }
  });

  it("throws error with input of unsupported format", async () => {
    const buffer = new ArrayBuffer(10);
    const view = new Uint8Array(buffer);
    view.set([0xaa, 0xaa, 0xaa, 0xaa, 0xaa]);

    try {
      await getContentType(buffer);
      throw new Error("An error should have already been thrown");
    } catch (err) {
      assert.equal((err as Error).message, "content type could not be detected");
    }
  });
}).timeout(60000);

describe("toRequestBody()", () => {
  it("converts string url to SourcePath", async () => {
    const result = await toRequestBody("http://url");

    assert.deepStrictEqual(result, { source: "http://url" });
  });
}).timeout(60000);
