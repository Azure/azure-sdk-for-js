// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import { MultipartRequestBody } from "../../src/interfaces.js";
import { isBlob } from "../../src/util/typeGuards.js";
import { Readable } from "node:stream";
import { performRequest } from "../formDataPolicy.spec.js";
import { createFileFromStream, getRawContent } from "../../src/util/file.js";

describe("formDataPolicy (node-only)", function () {
  it("can upload a Node ReadableStream", async function () {
    const result = await performRequest({
      file: createFileFromStream(() => Readable.from(Buffer.from("aaa")), "file.bin", {
        type: "text/plain",
      }),
    });

    const parts = (result.request.multipartBody as MultipartRequestBody).parts;
    assert.ok(parts.length === 1, "expected 1 part");
    assert.deepEqual(
      parts[0].headers,
      createHttpHeaders({
        "Content-Type": "text/plain",
        "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
      }),
    );
    assert.ok(isBlob(parts[0].body));

    const buffers: Buffer[] = [];
    for await (const part of getRawContent(parts[0].body as Blob) as NodeJS.ReadableStream) {
      buffers.push(part as Buffer);
    }

    const content = Buffer.concat(buffers);
    assert.deepEqual([...content], [...Buffer.from("aaa")]);
  });
});
