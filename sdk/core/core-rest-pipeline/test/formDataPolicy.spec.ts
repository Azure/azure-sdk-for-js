// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, describe, it, vi, expect } from "vitest";

import {
  type PipelineResponse,
  type SendRequest,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  formDataPolicy,
  multipartPolicy,
} from "../src";
import type { BodyPart, FormDataMap, MultipartRequestBody } from "../src/interfaces";
import { createFile } from "../src/util/file";

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
  const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
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
    const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.mockResolvedValue(successResponse);

    const policy = formDataPolicy();

    const result = await policy.sendRequest(request, next);

    assert.isUndefined(result.request.formData);
    assert.strictEqual(
      result.request.body,
      `service=registry.azurecr.io&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read`
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
    const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.mockResolvedValue(successResponse);

    const policy = formDataPolicy();

    const result = await policy.sendRequest(request, next);

    assert.isUndefined(result.request.formData);
    assert.strictEqual(result.request.body, `a=va&b=vb&c=vc1&c=vc2`);
  });

  describe("multipart/form-data", function () {
    it("throws if request.body is already present", async function () {
      const request = createPipelineRequest({
        url: "https://bing.com",
        headers: createHttpHeaders({
          "Content-Type": "multipart/form-data",
        }),
        formData: {},
        body: "AAAAAAAAAAAA",
      });
      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request,
        status: 200,
      };
      const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.mockResolvedValue(successResponse);
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(formDataPolicy());
      pipeline.addPolicy(multipartPolicy());

      await expect(pipeline.sendRequest({ sendRequest: next }, request)).rejects.toThrow(
        /multipartBody and regular body cannot be set at the same time/
      );
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
          })
        );
        const buf = new Uint8Array(
          await new Response((parts[0].body as any).stream()).arrayBuffer()
        );
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
            // Content-Type should not be inferred
            "Content-Disposition": `form-data; name="file"; filename="blob"`,
          })
        );
        const buf = new Uint8Array(
          await new Response((parts[0].body as any).stream()).arrayBuffer()
        );
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
          })
        );

        const content = new Uint8Array(await (parts[0].body as Blob).arrayBuffer());
        assert.deepEqual([...content], [0x01, 0x02, 0x03]);
      });
    });
  });
});
