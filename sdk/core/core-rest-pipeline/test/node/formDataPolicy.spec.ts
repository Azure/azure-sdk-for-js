// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, describe, it } from "vitest";
import { createHttpHeaders } from "../../src/httpHeaders";
import type { BodyPart, MultipartRequestBody } from "../../src/interfaces";
import { isBlob } from "../../src/util/typeGuards";
import { Readable } from "stream";
import { performRequest } from "../formDataPolicy.spec";
import { createFile, createFileFromStream } from "../../src/util/file";
import { ReadableStream } from "stream/web";

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
    for await (const part of (parts[0].body as Blob).stream() as ReadableStream<Uint8Array>) {
      buffers.push(part as Buffer);
    }

    const content = Buffer.concat(buffers);
    assert.deepEqual([...content], [...Buffer.from("aaa")]);
  });

  it("prepares a form with multiple fields correctly", async function () {
    // add field with spooky unicode characters to ensure encoding is working
    const result = await performRequest({ a: "va", b: "vb", c: "👻👻" });
    assert.isUndefined(result.request.formData);
    const multipartBody = result.request.multipartBody as any;
    assert.ok(multipartBody, "expecting multipartBody to be defined");
    const parts = (multipartBody as any).parts as BodyPart[];
    const enc = new TextEncoder();
    assert.ok(parts.length === 3, "need 3 parts");
    assert.deepEqual(parts[0], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="a"`,
      }),
      body: enc.encode("va"),
    });
    assert.deepEqual(parts[1], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="b"`,
      }),
      body: enc.encode("vb"),
    });
    assert.deepEqual(parts[2], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="c"`,
      }),
      body: enc.encode("👻👻"),
    });
  });

  describe("file uploads", function () {
    it("can upload a File object", async function () {
      if (typeof File === "undefined") {
        this.skip();
      }

      const result = await performRequest({
        file: new File([new Uint8Array([1, 2, 3])], "file.bin", {
          type: "application/octet-stream",
        }),
      });

      const parts = (result.request.multipartBody as MultipartRequestBody).parts;
      assert.ok(parts.length === 1, "expected 1 part");
      assert.deepEqual(
        parts[0].headers,
        createHttpHeaders({
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
        }),
      );
      const buf = new Uint8Array(await new Response((parts[0].body as any).stream()).arrayBuffer());
      assert.deepEqual([...buf], [1, 2, 3]);
    });

    it("can upload a Blob object", async function () {
      if (typeof Blob === "undefined") {
        this.skip();
      }

      const result = await performRequest({
        file: new Blob([new Uint8Array([1, 2, 3])]),
      });

      const parts = (result.request.multipartBody as MultipartRequestBody).parts;
      assert.ok(parts.length === 1, "expected 1 part");
      assert.deepEqual(
        parts[0].headers,
        createHttpHeaders({
          // Content-Type should default to 'application/octet-stream' for binary content (lack of content type is reserved for text content)
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `form-data; name="file"; filename="blob"`,
        }),
      );
      const buf = new Uint8Array(await new Response((parts[0].body as any).stream()).arrayBuffer());
      assert.deepEqual([...buf], [1, 2, 3]);
    });

    it("can upload a Uint8Array using createFile", async function () {
      const result = await performRequest({
        file: createFile(new Uint8Array([0x01, 0x02, 0x03]), "file.bin", {
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

      const content = new Uint8Array(await (parts[0].body as Blob).arrayBuffer());
      assert.deepEqual([...content], [0x01, 0x02, 0x03]);
    });
  });
});
