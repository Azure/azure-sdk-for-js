// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import type {
  PipelineResponse,
  SendRequest,
  FormDataMap,
  MultipartRequestBody,
} from "@azure/core-rest-pipeline";
import { stringToUint8Array } from "@azure/core-util";
import {
  createPipelineRequest,
  createHttpHeaders,
  formDataPolicy,
  createFile,
  createFileFromStream,
} from "@azure/core-rest-pipeline";

export async function performRequest(formData: FormDataMap): Promise<PipelineResponse> {
  const request = createPipelineRequest({
    url: "https://bing.com",
    headers: createHttpHeaders({
      "Content-Type": "multipart/form-data",
    }),
    formData,
  });
  const successResponse: PipelineResponse = {
    headers: createHttpHeaders(),
    request,
    status: 200,
  };
  const next = vi.fn<SendRequest>();
  next.mockResolvedValue(successResponse);

  const policy = formDataPolicy();

  return policy.sendRequest(request, next);
}

describe("formDataPolicy", function () {
  describe("file uploads", function () {
    it("Sets filename properly when using createFile", async function () {
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

    it.skipIf(typeof Blob === "undefined")(
      "Sets filename properly when using createFileFromStream",
      async function () {
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
          await new Response((parts[0].body as any).stream()).arrayBuffer(),
        );
        assert.deepEqual([...buf], [1, 2, 3]);
      },
    );

    it.skipIf(typeof File === "undefined")(
      "Can upload an array of files of different kinds",
      async function () {
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
          [...new Uint8Array(await new Response((parts[0].body as any).stream()).arrayBuffer())],
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
          [...new Uint8Array(await new Response((parts[1].body as any).stream()).arrayBuffer())],
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
          [...new Uint8Array(await new Response((parts[2].body as any).stream()).arrayBuffer())],
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
      },
    );
  });
});
