// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import type {
  PipelineResponse,
  SendRequest,
  BodyPart,
  FormDataMap,
  MultipartRequestBody,
} from "@typespec/ts-http-runtime";
import { createPipelineRequest, createHttpHeaders } from "@typespec/ts-http-runtime";
import { formDataPolicy } from "$internal/policies/formDataPolicy.js";
import { isBrowser, isNodeLike } from "$internal/util/checkEnvironment.js";

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
  it("prepares x-www-form-urlencoded form data correctly", async function () {
    const request = createPipelineRequest({
      url: "https://bing.com",
      headers: createHttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });
    request.formData = {
      service: "registry.azurecr.io",
      scope: "repository:library/hello-world:metadata_read",
    };
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

  it("prepares x-www-form-urlencoded form data correctly for array value", async function () {
    const request = createPipelineRequest({
      url: "https://bing.com",
      headers: createHttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });
    request.formData = { a: "va", b: "vb", c: ["vc1", "vc2"] };
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
    assert.strictEqual(result.request.body, `a=va&b=vb&c=vc1&c=vc2`);
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

  it("Prepares a form with an array of fields correctly", async function () {
    const result = await performRequest({ a: "va", b: ["vb", "👻👻"] });
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
        "Content-Disposition": `form-data; name="b"`,
      }),
      body: enc.encode("👻👻"),
    });
  });

  describe("file uploads", function () {
    it.skipIf(typeof File === "undefined")("can upload a File object", async function () {
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

    it.skipIf(typeof Blob === "undefined")("can upload a Blob object", async function () {
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
  });

  describe("FormData request bodies", () => {
    it.runIf(isNodeLike)("should be processed by formDataPolicy in Node", async () => {
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

    it.runIf(isBrowser)("should be passed through in browser", async () => {
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
});
