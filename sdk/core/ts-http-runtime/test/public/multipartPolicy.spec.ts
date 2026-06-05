// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, expect } from "vitest";
import {
  createHttpHeaders,
  type PipelineResponse,
  type SendRequest,
  createPipelineRequest,
  type PipelineRequestOptions,
} from "../../src/index.js";
import { multipartPolicy } from "../../src/policies/internal.js";

async function performRequest(
  requestOptions: Omit<PipelineRequestOptions, "url" | "method">,
): Promise<ReturnType<typeof createPipelineRequest>> {
  const request = createPipelineRequest({
    url: "https://example.com",
    method: "POST",
    ...requestOptions,
  });
  const policy = multipartPolicy();

  const successResponse: PipelineResponse = {
    headers: createHttpHeaders(),
    request,
    status: 200,
  };
  const next = vi.fn<SendRequest>();
  next.mockResolvedValue(successResponse);

  await policy.sendRequest(request, next);
  return request;
}

describe("multipartPolicy", function () {
  it("passes through when request body is not MultipartRequestBody", async function () {
    const request = createPipelineRequest({
      url: "https://example.com",
      method: "POST",
      headers: createHttpHeaders({ "content-type": "multipart/form-data" }),
    });

    const originalRequest = createPipelineRequest({
      url: "https://example.com",
      method: "POST",
      headers: createHttpHeaders({ "content-type": "multipart/form-data" }),
    });

    originalRequest.requestId = request.requestId;

    const policy = multipartPolicy();

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    await policy.sendRequest(request, next);

    assert.deepStrictEqual(
      request,
      originalRequest,
      "multipartPolicy touched a request that is not multipart",
    );
  });

  describe("content-type request header and boundary", async function () {
    it("header is populated to multipart/mixed when not set", async function () {
      const request = await performRequest({
        headers: createHttpHeaders({}),
        multipartBody: {
          parts: [],
        },
      });

      assert.isTrue(request.headers.has("content-type"), "content-type header expected");
      assert.match(
        request.headers.get("content-type")!,
        /multipart\/mixed; boundary=[0-9a-zA-Z'()+,-./:=?]+/,
        "content-type must be multipart/mixed with a valid boundary",
      );
    });

    it("throws when multipart request body present but content-type is not multipart", async function () {
      await expect(
        performRequest({
          headers: createHttpHeaders({
            "content-type": "application/json",
          }),
          multipartBody: {
            parts: [],
          },
        }),
      ).rejects.toThrow(
        /Got multipart request body, but content-type header was not multipart: application\/json/,
      );
    });

    it("throws when invalid boundary is set in content-type header", async function () {
      await expect(
        performRequest({
          headers: createHttpHeaders({
            "content-type": "multipart/form-data; boundary=%%%%%%%",
          }),
          multipartBody: {
            parts: [],
          },
        }),
      ).rejects.toThrow(/Multipart boundary "%%%%%%%" contains invalid characters/);
    });

    it("throws when invalid boundary is set in body", async function () {
      await expect(
        performRequest({
          multipartBody: {
            boundary: "%%%%%%%",
            parts: [],
          },
        }),
      ).rejects.toThrow(/Multipart boundary "%%%%%%%" contains invalid characters/);
    });

    it("generates boundary when none specified in existing header", async function () {
      const request = await performRequest({
        headers: createHttpHeaders({
          "content-type": "multipart/alternative",
        }),
        multipartBody: {
          parts: [],
        },
      });

      assert.isTrue(request.headers.has("content-type"), "content-type header expected");
      assert.match(
        request.headers.get("content-type")!,
        /multipart\/alternative; boundary=[0-9a-zA-Z'()+,-./:=?]+/,
        "content-type must be multipart/alternative with a valid boundary",
      );
    });

    it("preserves boundary when it is already specified", async function () {
      const request = await performRequest({
        headers: createHttpHeaders({
          "content-type": "multipart/form-data; boundary=blah",
        }),
        multipartBody: {
          parts: [],
        },
      });

      assert.equal(
        request.headers.get("content-type"),
        "multipart/form-data; boundary=blah",
        "fully specified content-type header should be preserved",
      );
    });

    it("sets the boundary when it is specified in the multipart request body", async function () {
      const request = await performRequest({
        headers: createHttpHeaders({
          "content-type": "multipart/alternative",
        }),
        multipartBody: {
          boundary: "blah",
          parts: [],
        },
      });

      assert.equal(
        request.headers.get("content-type"),
        "multipart/alternative; boundary=blah",
        "boundary was not added",
      );
    });
  });
});
