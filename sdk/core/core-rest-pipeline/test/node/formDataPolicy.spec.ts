import { assert } from "chai";
import { createHttpHeaders } from "../../src/httpHeaders";
import { MultipartRequestBody, StreamableBlob } from "../../src/interfaces";
import { isBlobLike, isNodeReadableStream } from "../../src/util/typeGuards";
import { Readable } from "stream";
import { performRequest } from "../formDataPolicy.spec";

describe("formDataPolicy (node-only)", function () {
  it("can upload a Node ReadableStream", async function () {
    const result = await performRequest({
      file: {
        stream: Readable.from(Buffer.from("aaa")),
        name: "file.bin",
        type: "text/plain",
      },
    });

    const parts = (result.request.body as MultipartRequestBody).parts;
    assert.ok(parts.length === 1, "expected 1 part");
    assert.deepEqual(
      parts[0].headers,
      createHttpHeaders({
        "Content-Type": "text/plain",
        "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
      })
    );
    assert.ok(isBlobLike(parts[0].body));
    assert.ok(isNodeReadableStream((parts[0].body as StreamableBlob).stream));

    const buffers: Buffer[] = [];
    for await (const part of (parts[0].body as StreamableBlob).stream as NodeJS.ReadableStream) {
      buffers.push(part as Buffer);
    }

    const content = Buffer.concat(buffers);
    assert.deepEqual([...content], [...Buffer.from("aaa")]);
  });
});
