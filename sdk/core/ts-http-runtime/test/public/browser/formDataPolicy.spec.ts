// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import {
  type PipelineResponse,
  type SendRequest,
  type MultipartRequestBody,
  createPipelineRequest,
  createHttpHeaders,
} from "../../../src/index.js";
import { formDataPolicy } from "../../../src/policies/internal.js";
import { performRequest } from "../formDataPolicy.spec.js";

describe("formDataPolicy (browser)", () => {
  describe("FormData request bodies", () => {
    it("should be passed through in browser", async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
        headers: createHttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
      const formData = new FormData();
      formData.append("service", "registry.azurecr.io");
      formData.append("scope", "repository:library/hello-world:metadata_read");
      request.body = formData;

      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request,
        status: 200,
      };
      const next = vi.fn<SendRequest>();
      next.mockResolvedValue(successResponse);

      const policy = formDataPolicy();

      const result = await policy.sendRequest(request, next);

      assert.isUndefined(result.request.formData);
      assert.strictEqual(result.request.body, formData);
    });
  });

  describe("file uploads", function () {
    it("can upload a File object", async function () {
      const result = await performRequest({
        file: new File([new Uint8Array([1, 2, 3])], "file.bin", {
          type: "application/octet-stream",
        }),
      });

      const parts = (result.request.multipartBody as MultipartRequestBody).parts;
      assert.equal(parts.length, 1, "expected 1 part");
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
      const result = await performRequest({
        file: new Blob([new Uint8Array([1, 2, 3])]),
      });

      const parts = (result.request.multipartBody as MultipartRequestBody).parts;
      assert.equal(parts.length, 1, "expected 1 part");
      assert.deepEqual(
        parts[0].headers,
        createHttpHeaders({
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `form-data; name="file"; filename="blob"`,
        }),
      );
      const buf = new Uint8Array(await new Response((parts[0].body as any).stream()).arrayBuffer());
      assert.deepEqual([...buf], [1, 2, 3]);
    });
  });
});
