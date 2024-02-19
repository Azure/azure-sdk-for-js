// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, describe, it } from "vitest";
import { createHttpHeaders } from "../../src/httpHeaders";
import type { BodyPart, MultipartRequestBody } from "../../src/interfaces";
import { isBlob } from "../../src/util/typeGuards";
import { Readable } from "stream";
import { performRequest } from "../formDataPolicy.spec";
import { createFile, createFileFromStream, getRawContent } from "../../src/util/file";

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
