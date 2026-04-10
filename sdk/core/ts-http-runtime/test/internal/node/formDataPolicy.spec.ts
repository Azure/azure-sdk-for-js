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

describe("formDataPolicy (node)", () => {
  describe("FormData request bodies", () => {
    it("should be processed by formDataPolicy in Node", async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
        headers: createHttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
      request.body = new FormData();
      request.body.append("service", "registry.azurecr.io");
      request.body.append("scope", "repository:library/hello-world:metadata_read");

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
      assert.strictEqual(
        result.request.body,
        `service=registry.azurecr.io&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read`,
      );
    });

    it("should convert FormData with multiple values for the same key", async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
        headers: createHttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
      request.body = new FormData();
      request.body.append("tag", "a");
      request.body.append("tag", "b");
      request.body.append("tag", "c");

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
      assert.strictEqual(result.request.body, "tag=a&tag=b&tag=c");
    });

    it("should convert FormData body to multipart when content-type is multipart/form-data", async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
        headers: createHttpHeaders({
          "Content-Type": "multipart/form-data",
        }),
      });
      request.body = new FormData();
      request.body.append("field", "value");
      request.body.append("file", new Blob([new Uint8Array([1, 2, 3])]), "test.bin");

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
      assert.isUndefined(result.request.body);
      const parts = (result.request.multipartBody as MultipartRequestBody).parts;
      assert.equal(parts.length, 2, "expected 2 parts");
      assert.include(
        parts[0].headers.get("Content-Disposition"),
        'name="field"',
        "first part should be the text field",
      );
      assert.include(
        parts[1].headers.get("Content-Disposition"),
        'name="file"',
        "second part should be the file",
      );
    });

    it("should not convert non-FormData bodies", async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
      });
      const bodyContent = JSON.stringify({ key: "value" });
      request.body = bodyContent;

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
      assert.strictEqual(result.request.body, bodyContent);
    });
  });
});
