// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createHttpHeaders } from "../../../src/httpHeaders.js";
import type { MultipartRequestBody } from "../../../src/interfaces.js";
import { Readable } from "node:stream";
import { performRequest } from "../formDataPolicy.spec.js";
import { createFile, createFileFromStream, getRawContent } from "../../../src/util/file.js";
import { stringToUint8Array } from "@azure/core-util";

describe("formDataPolicy (node-only)", function () {
  it("can upload a Node ReadableStream", async function () {
    const result = await performRequest({
      file: createFileFromStream(() => Readable.from(Buffer.from("aaa")), "file.bin", {
        type: "text/plain",
      }),
    });

    const parts = (result.request.multipartBody as MultipartRequestBody).parts;
    assert.equal(parts.length, 1, "expected 1 part");
    assert.deepEqual(
      parts[0].headers,
      createHttpHeaders({
        "Content-Type": "text/plain",
        "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
      }),
    );

    const buffers: Buffer[] = [];
    for await (const part of getRawContent(parts[0].body as Blob) as NodeJS.ReadableStream) {
      buffers.push(part as Buffer);
    }

    const content = Buffer.concat(buffers);
    assert.deepEqual([...content], [...Buffer.from("aaa")]);
  });

  it("Sets filename properly when using createFileFromStream", async function () {
    const blob = new Blob([new Uint8Array([1, 2, 3])]);
    const result = await performRequest({
      file: createFileFromStream(() => blob.stream(), "file.bin"),
    });

    const parts = (result.request.multipartBody as MultipartRequestBody).parts;
    assert.equal(parts.length, 1);
    assert.deepEqual(
      parts[0].headers,
      createHttpHeaders({
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
      }),
    );

    const buf = new Uint8Array(
      await new Response(getRawContent(parts[0].body as Blob) as ReadableStream).arrayBuffer(),
    );
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

    const parts = (result.request.multipartBody as MultipartRequestBody).parts;
    assert.equal(parts.length, 4);

    assert.deepEqual(
      parts[0].headers,
      createHttpHeaders({
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `form-data; name="files"; filename="file1.bin"`,
      }),
    );
    assert.deepEqual(
      [
        ...new Uint8Array(
          await new Response(getRawContent(parts[0].body as Blob) as Blob).arrayBuffer(),
        ),
      ],
      [1, 2, 3],
    );

    assert.deepEqual(
      parts[1].headers,
      createHttpHeaders({
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `form-data; name="files"; filename="file2.bin"`,
      }),
    );
    assert.deepEqual(
      [
        ...new Uint8Array(
          await new Response(getRawContent(parts[1].body as Blob) as Blob).arrayBuffer(),
        ),
      ],
      [2, 3, 4],
    );

    assert.deepEqual(
      parts[2].headers,
      createHttpHeaders({
        "Content-Type": "application/json",
        "Content-Disposition": `form-data; name="files"; filename="file3.json"`,
      }),
    );
    assert.deepEqual(
      [
        ...new Uint8Array(
          await new Response(getRawContent(parts[2].body as Blob) as Blob).arrayBuffer(),
        ),
      ],
      [4, 5, 6],
    );

    assert.deepEqual(
      parts[3].headers,
      createHttpHeaders({
        "Content-Disposition": `form-data; name="textField"`,
      }),
    );
    assert.deepEqual(
      [...(parts[3].body as Uint8Array)],
      [...stringToUint8Array(textField, "utf-8")],
    );
  });
});
