// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  PipelineResponse,
  SendRequest,
  createHttpHeaders,
  createPipelineRequest,
  formDataPolicy,
} from "../src";
import { isMultipartRequestBody } from "../src/policies/multipartPolicy";
import { BlobLike, BodyPart, FormDataMap, MultipartRequestBody } from "../src/interfaces";
import { isNode } from "@azure/core-util";
import { isBlobLike, isNodeReadableStream } from "../src/util/stream";
import { Readable } from "stream";

describe("formDataPolicy", function () {
  afterEach(function () {
    sinon.restore();
  });

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
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

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
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = formDataPolicy();

    const result = await policy.sendRequest(request, next);

    assert.isUndefined(result.request.formData);
    assert.strictEqual(result.request.body, `a=va&b=vb&c=vc1&c=vc2`);
  });

  describe("multipart/form-data", function () {
    async function performRequest(formData: FormDataMap) {
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
      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.resolves(successResponse);

      const policy = formDataPolicy();

      return policy.sendRequest(request, next);
    }

    it("prepares a form with multiple fields correctly", async function () {
      const result = await performRequest({ a: "va", b: "vb" });
      assert.isUndefined(result.request.formData);
      const body = result.request.body as any;
      assert.ok(body, "expecting valid body");
      assert.ok(isMultipartRequestBody(body), "expecting body to be MultipartRequestBody");
      const parts = (body as any).parts as BodyPart[];
      const enc = new TextEncoder();
      assert.ok(parts.length === 2, "need 2 parts");
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
    });

    describe("file uploads", function () {
      it("can upload a File object", async function () {
        // NodeHttpClient does not support web streams
        if (isNode) {
          this.skip();
        }

        const result = await performRequest({
          file: new File([new Uint8Array([1, 2, 3])], "file.bin", {
            type: "application/octet-stream",
          }),
        });

        const parts = (result.request.body as MultipartRequestBody).parts;
        assert.ok(parts.length === 1, "expected 1 part");
        assert.deepEqual(
          parts[0].headers,
          createHttpHeaders({
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
          })
        );
        assert.ok(isBlobLike(parts[0].body));
        const buf = new Uint8Array(
          await new Response((parts[0].body as any).stream()).arrayBuffer()
        );
        assert.deepEqual([...buf], [1, 2, 3]);
      });

      it("can upload a Blob object", async function () {
        // NodeHttpClient does not support web streams
        if (isNode) {
          this.skip();
        }

        const result = await performRequest({
          file: new Blob([new Uint8Array([1, 2, 3])]),
        });

        const parts = (result.request.body as MultipartRequestBody).parts;
        assert.ok(parts.length === 1, "expected 1 part");
        assert.deepEqual(
          parts[0].headers,
          createHttpHeaders({
            // Content-Type should not be inferred
            "Content-Disposition": `form-data; name="file"; filename="blob"`,
          })
        );
        assert.ok(isBlobLike(parts[0].body));
        const buf = new Uint8Array(
          await new Response((parts[0].body as any).stream()).arrayBuffer()
        );
        assert.deepEqual([...buf], [1, 2, 3]);
      });

      it("can upload a Node ReadableStream", async function () {
        if (!isNode) {
          this.skip();
        }

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
        assert.ok(isNodeReadableStream((parts[0].body as BlobLike).stream));

        const buffers: Buffer[] = [];
        for await (const part of (parts[0].body as BlobLike).stream as NodeJS.ReadableStream) {
          buffers.push(part as Buffer);
        }

        const content = Buffer.concat(buffers);
        assert.deepEqual([...content], [...Buffer.from("aaa")]);
      });
    });
  });
});
