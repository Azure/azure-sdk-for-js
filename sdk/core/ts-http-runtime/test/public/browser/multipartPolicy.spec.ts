// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import {
  createHttpHeaders,
  type PipelineResponse,
  type SendRequest,
  createPipelineRequest,
  type PipelineRequestOptions,
  stringToUint8Array,
} from "../../../src/index.js";
import { multipartPolicy } from "../../../src/policies/internal.js";
import { assertBodyMatches } from "../../internal/browser/multipartTestHelper.js";

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

describe("multipartPolicy (browser)", function () {
  describe("multipart request body", function () {
    it("request with no parts matches spec", async function () {
      const request = await performRequest({
        multipartBody: {
          boundary: "blah",
          parts: [],
        },
      });

      const expectedBody = stringToUint8Array("--blah--\r\n\r\n", "utf-8");
      await assertBodyMatches(request.body, expectedBody);
    });

    it("is present with multiple parts", async function () {
      const request = await performRequest({
        multipartBody: {
          boundary: "blah",
          parts: [
            {
              body: stringToUint8Array("part1", "utf-8"),
              headers: createHttpHeaders(),
            },
            {
              body: stringToUint8Array("part2", "utf-8"),
              headers: createHttpHeaders(),
            },
          ],
        },
      });

      const expectedBody = stringToUint8Array(
        "--blah\r\n\r\npart1\r\n--blah\r\n\r\npart2\r\n--blah--\r\n\r\n",
        "utf-8",
      );
      await assertBodyMatches(request.body, expectedBody);
      assert.equal(
        request.headers.get("Content-Length"),
        expectedBody.byteLength.toString(),
        "Expected Content-Length header to equal length of body",
      );
    });

    it("supports Uint8Array body", async function () {
      const request = await performRequest({
        multipartBody: {
          boundary: "blah",
          parts: [
            {
              body: stringToUint8Array("part", "utf-8"),
              headers: createHttpHeaders(),
            },
          ],
        },
      });

      const expectedBody = stringToUint8Array("--blah\r\n\r\npart\r\n--blah--\r\n\r\n", "utf-8");
      await assertBodyMatches(request.body, expectedBody);
      assert.equal(
        request.headers.get("Content-Length"),
        expectedBody.byteLength.toString(),
        "Expected Content-Length header to equal length of body",
      );
    });
  });

  it("Supports Blob body", async function () {
    const blob = new Blob(["part1"]);

    const request = await performRequest({
      multipartBody: {
        boundary: "blah",
        parts: [
          {
            body: blob,
            headers: createHttpHeaders(),
          },
        ],
      },
    });

    const expectedBody = stringToUint8Array("--blah\r\n\r\npart1\r\n--blah--\r\n\r\n", "utf-8");
    await assertBodyMatches(request.body, expectedBody);
    assert.equal(request.headers.get("Content-Length"), expectedBody.byteLength.toString());
  });

  describe("part headers", function () {
    it("are present when specified", async function () {
      const request = await performRequest({
        multipartBody: {
          boundary: "blah",
          parts: [
            {
              body: stringToUint8Array("part1", "utf-8"),
              headers: createHttpHeaders({
                "Content-Type": "text/plain",
                "Content-Disposition": "form-data; name=aaa; filename=test.txt",
              }),
            },
          ],
        },
      });

      const expectedBody = stringToUint8Array(
        "--blah\r\nContent-Type: text/plain\r\nContent-Disposition: form-data; name=aaa; filename=test.txt\r\n\r\npart1\r\n--blah--\r\n\r\n",
        "utf-8",
      );
      await assertBodyMatches(request.body, expectedBody);
      assert.equal(
        request.headers.get("Content-Length"),
        expectedBody.byteLength.toString(),
        "Expected Content-Length header to equal length of body",
      );
    });
  });

  it("Supports web ReadableStream body", async function () {
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("part1"));
        controller.close();
      },
    });

    const request = createPipelineRequest({
      url: "https://example.com",
      method: "POST",
      multipartBody: {
        boundary: "blah",
        parts: [
          {
            body,
            headers: createHttpHeaders(),
          },
        ],
      },
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

    const expectedBody = stringToUint8Array("--blah\r\n\r\npart1\r\n--blah--\r\n\r\n", "utf-8");
    await assertBodyMatches(request.body, expectedBody);
    assert.isUndefined(
      request.headers.get("Content-Length"),
      "Content-Length value should not be inferred from a stream",
    );
  });
});
