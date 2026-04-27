// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import {
  type PipelineResponse,
  type SendRequest,
  type BodyPart,
  type MultipartRequestBody,
  createPipelineRequest,
  createHttpHeaders,
} from "../../../src/index.js";
import { formDataPolicy } from "../../../src/policies/internal.js";
import { performRequest } from "../formDataPolicy.spec.js";

function createFakeFile(
  content: Uint8Array<ArrayBuffer>,
  name: string,
  options: { type?: string } = {},
): File {
  // Mimics what core-rest-pipeline's createFile() returns in Node:
  // a plain object shaped as File, NOT a real File instance.
  const blob = new Blob([content]);
  return {
    arrayBuffer: async () =>
      content.buffer.slice(content.byteOffset, content.byteOffset + content.byteLength),
    bytes: async (): Promise<Uint8Array<ArrayBuffer>> => {
      throw new Error("Not implemented");
    },
    slice: (..._args: unknown[]): Blob => {
      throw new Error("Not implemented");
    },
    text: async (): Promise<string> => {
      throw new Error("Not implemented");
    },
    stream: () => blob.stream(),
    type: options.type ?? "",
    lastModified: new Date().getTime(),
    webkitRelativePath: "",
    size: content.byteLength,
    name,
  } as File;
}

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

  it("preserves filename from a real File object", async function () {
    const file = new File([new Uint8Array([1, 2, 3])], "real-file.txt", {
      type: "text/plain",
    });
    const result = await performRequest({ attachment: file });
    const parts = (result.request.multipartBody as any).parts as BodyPart[];
    assert.equal(parts.length, 1);
    const disposition = parts[0].headers.get("Content-Disposition");
    assert.include(disposition, 'filename="real-file.txt"');
    assert.equal(parts[0].headers.get("Content-Type"), "text/plain");
  });

  it("preserves filename from a File-like object (e.g. createFile helper)", async function () {
    const fakeFile = createFakeFile(new Uint8Array([1, 2, 3]), "fake-file.bin", {
      type: "application/octet-stream",
    });
    // Verify this is NOT a real File instance (matches createFile behavior in Node)
    assert.isFalse(fakeFile instanceof File);
    const result = await performRequest({ attachment: fakeFile });
    const parts = (result.request.multipartBody as any).parts as BodyPart[];
    assert.equal(parts.length, 1);
    const disposition = parts[0].headers.get("Content-Disposition");
    assert.include(disposition, 'filename="fake-file.bin"');
  });

  it("falls back to 'blob' when File-like object has no name", async function () {
    const blob = new Blob(["abc"], { type: "image/png" });
    const result = await performRequest({ attachment: blob });
    const parts = (result.request.multipartBody as any).parts as BodyPart[];
    assert.equal(parts.length, 1);
    const disposition = parts[0].headers.get("Content-Disposition");
    assert.include(disposition, 'filename="blob"');
    assert.equal(parts[0].headers.get("Content-Type"), "image/png");
  });
});
