// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import type { PipelineResponse, SendRequest } from "../../src/index.js";
import type { FormDataMap } from "../../src/interfaces.js";
import { createPipelineRequest } from "../../src/pipelineRequest.js";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import { formDataPolicy } from "../../src/policies/formDataPolicy.js";
import { createFile } from "../../src/util/file.js";

function hasBlobBody(value: unknown): value is { arrayBuffer(): Promise<ArrayBuffer> } {
  return typeof value === "object" && value !== null && "arrayBuffer" in value;
}

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

      const multipartBody = result.request.multipartBody;
      assert.isDefined(multipartBody, "expected multipartBody to be defined");
      const parts = multipartBody!.parts;
      assert.equal(parts.length, 1, "expected 1 part");
      assert.deepEqual(
        parts[0].headers,
        createHttpHeaders({
          "Content-Type": "text/plain",
          "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
        }),
      );

      const body = parts[0].body;
      if (!hasBlobBody(body)) {
        assert.fail("expected body to have arrayBuffer method");
      }
      const content = new Uint8Array(await body.arrayBuffer());
      assert.deepEqual([...content], [0x01, 0x02, 0x03]);
    });
  });

  describe("file uploads", function () {
    it("handles subarray content correctly in createFile", async function () {
      const backing = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04]);
      const subarray = backing.subarray(1, 4);
      const result = await performRequest({
        file: createFile(subarray, "sub.bin"),
      });

      const multipartBody = result.request.multipartBody;
      assert.isDefined(multipartBody, "expected multipartBody to be defined");
      const parts = multipartBody!.parts;
      assert.equal(parts.length, 1, "expected 1 part");

      const body = parts[0].body;
      if (!hasBlobBody(body)) {
        assert.fail("expected body to have arrayBuffer method");
      }
      const content = new Uint8Array(await body.arrayBuffer());
      assert.deepEqual([...content], [0x01, 0x02, 0x03]);
    });
  });
});
