// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { createHttpHeaders } from "../src/httpHeaders";
import { PipelineRequest, PipelineResponse, SendRequest } from "../src/interfaces";
import { createPipelineRequest } from "../src/pipelineRequest";
import { multipartPolicy } from "../src/policies/multipartPolicy";
import { assert } from "chai";
import { PipelineRequestOptions } from "../src/pipelineRequest";
import { stringToUint8Array } from "../src/util/bytesEncoding";
import { assertBodyMatches } from "./util";

export async function performRequest(
  requestOptions: Omit<PipelineRequestOptions, "url" | "method">,
): Promise<PipelineRequest> {
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
  const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
  next.resolves(successResponse);

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
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

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

      assert.ok(request.headers.has("content-type"), "content-type header expected");
      assert.match(
        request.headers.get("content-type")!,
        /multipart\/mixed; boundary=[0-9a-zA-Z'()+,-./:=?]+/,
        "content-type must be multipart/mixed with a valid boundary",
      );
    });

    it("throws when multipart request body present but content-type is not multipart", async function () {
      await assert.isRejected(
        performRequest({
          headers: createHttpHeaders({
            "content-type": "application/json",
          }),
          multipartBody: {
            parts: [],
          },
        }),
        /Got multipart request body, but content-type header was not multipart: application\/json/,
      );
    });

    it("throws when invalid boundary is set in content-type header", async function () {
      await assert.isRejected(
        performRequest({
          headers: createHttpHeaders({
            "content-type": "multipart/form-data; boundary=%%%%%%%",
          }),
          multipartBody: {
            parts: [],
          },
        }),
        /Multipart boundary "%%%%%%%" contains invalid characters/,
      );
    });

    it("throws when invalid boundary is set in body", async function () {
      await assert.isRejected(
        performRequest({
          multipartBody: {
            boundary: "%%%%%%%",
            parts: [],
          },
        }),
        /Multipart boundary "%%%%%%%" contains invalid characters/,
      );
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

      assert.ok(request.headers.has("content-type"), "content-type header expected");
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

    it("Supports web ReadableStream body", async function () {
      const body = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("part1"));
          controller.close();
        },
      });

      const request = await performRequest({
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

      const expectedBody = stringToUint8Array("--blah\r\n\r\npart1\r\n--blah--\r\n\r\n", "utf-8");
      await assertBodyMatches(request.body, expectedBody);
      assert.isUndefined(
        request.headers.get("Content-Length"),
        "Content-Length value should not be inferred from a stream",
      );
    });
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
});
