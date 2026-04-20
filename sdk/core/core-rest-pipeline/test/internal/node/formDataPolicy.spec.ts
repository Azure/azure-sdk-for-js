// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createHttpHeaders } from "../../../src/httpHeaders.js";
import type { MultipartRequestBody } from "../../../src/interfaces.js";
import { Readable } from "node:stream";
import { performRequest } from "../formDataPolicy.spec.js";
import { createFile, createFileFromStream, getRawContent, hasRawContent } from "../../../src/util/file.js";
import { stringToUint8Array } from "@azure/core-util";

function getMultipartParts(result: { request: { multipartBody?: MultipartRequestBody } }) {
  const multipartBody = result.request.multipartBody;
  assert.isDefined(multipartBody, "expected multipartBody to be defined");
  return multipartBody!.parts;
}

async function readBodyAsArrayBuffer(body: unknown): Promise<ArrayBuffer> {
  assert.isTrue(body instanceof Blob || hasRawContent(body), "expected Blob or raw content");
  const raw = getRawContent(body as Blob);
  return new Response(raw as BodyInit).arrayBuffer();
}

describe("formDataPolicy (node-only)", function () {
  it("can upload a Node ReadableStream", async function () {
    const result = await performRequest({
      file: createFileFromStream(() => Readable.from(Buffer.from("aaa")), "file.bin", {
        type: "text/plain",
      }),
    });

    const parts = getMultipartParts(result);
    assert.equal(parts.length, 1, "expected 1 part");
    assert.deepEqual(
      parts[0].headers,
      createHttpHeaders({
        "Content-Type": "text/plain",
        "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
      }),
    );

    const buffers: Buffer[] = [];
    assert.isTrue(
      parts[0].body instanceof Blob || hasRawContent(parts[0].body),
      "expected Blob or raw content",
    );
    const rawContent = getRawContent(parts[0].body as Blob);
    assert.isTrue(Symbol.asyncIterator in rawContent, "expected async iterable");
    for await (const part of rawContent as NodeJS.ReadableStream) {
      if (!Buffer.isBuffer(part)) {
        assert.fail("expected Buffer chunk");
      }
      buffers.push(part);
    }

    const content = Buffer.concat(buffers);
    assert.deepEqual([...content], [...Buffer.from("aaa")]);
  });

  it("Sets filename properly when using createFileFromStream", async function () {
    const blob = new Blob([new Uint8Array([1, 2, 3])]);
    const result = await performRequest({
      file: createFileFromStream(() => blob.stream(), "file.bin"),
    });

    const parts = getMultipartParts(result);
    assert.equal(parts.length, 1);
    assert.deepEqual(
      parts[0].headers,
      createHttpHeaders({
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
      }),
    );

    const buf = new Uint8Array(await readBodyAsArrayBuffer(parts[0].body));
    assert.deepEqual([...buf], [1, 2, 3]);
  });

  it("Can upload an array of files of different kinds", async function () {
    const file1 = new File([new Uint8Array([1, 2, 3])], "file1.bin");
    const file2 = createFile(new Uint8Array([2, 3, 4]), "file2.bin");
    const file3 = createFileFromStream(
      () => new Blob([new Uint8Array([4, 5, 6])]).stream(),
      "file3.json",
      { type: "application/json" },
    );
    const textField = "Hello, I am text!";

    const result = await performRequest({
      files: [file1, file2, file3],
      textField,
    });

    const parts = getMultipartParts(result);
    assert.equal(parts.length, 4);

    assert.deepEqual(
      parts[0].headers,
      createHttpHeaders({
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `form-data; name="files"; filename="file1.bin"`,
      }),
    );
    assert.deepEqual([...new Uint8Array(await readBodyAsArrayBuffer(parts[0].body))], [1, 2, 3]);

    assert.deepEqual(
      parts[1].headers,
      createHttpHeaders({
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `form-data; name="files"; filename="file2.bin"`,
      }),
    );
    assert.deepEqual([...new Uint8Array(await readBodyAsArrayBuffer(parts[1].body))], [2, 3, 4]);

    assert.deepEqual(
      parts[2].headers,
      createHttpHeaders({
        "Content-Type": "application/json",
        "Content-Disposition": `form-data; name="files"; filename="file3.json"`,
      }),
    );
    assert.deepEqual([...new Uint8Array(await readBodyAsArrayBuffer(parts[2].body))], [4, 5, 6]);

    assert.deepEqual(
      parts[3].headers,
      createHttpHeaders({
        "Content-Disposition": `form-data; name="textField"`,
      }),
    );
    const textBody = parts[3].body;
    if (!(textBody instanceof Uint8Array)) {
      assert.fail("expected Uint8Array body");
    }
    assert.deepEqual([...textBody], [...stringToUint8Array(textField, "utf-8")]);
  });
});
