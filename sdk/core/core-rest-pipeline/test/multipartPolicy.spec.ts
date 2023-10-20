import sinon from "sinon";
import { createHttpHeaders } from "../src/httpHeaders";
import { PipelineRequest, PipelineResponse, SendRequest } from "../src/interfaces";
import { createPipelineRequest } from "../src/pipelineRequest";
import { multipartPolicy } from "../src/policies/multipartPolicy";
import assert from "assert";
import { PipelineRequestOptions } from "../src/pipelineRequest";

async function performRequest(
  requestOptions: Omit<PipelineRequestOptions, "url" | "method">
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

describe.only("multipartPolicy", function() {
  it("passes through when request body is not MultipartRequestBody", async function() {
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
      "multipartPolicy touched a request that is not multipart"
    );
  });

  describe("content-type request header", async function() {
    it("header is populated to multipart/mixed when not set", async function() {
      const request = await performRequest({
        headers: createHttpHeaders({}),
        body: {
          parts: [],
        },
      });

      assert.ok(request.headers.has("content-type"), "content-type header expected");
      assert.match(
        request.headers.get("content-type")!,
        /multipart\/mixed; boundary=[0-9a-zA_Z'()+,-./:=?]/,
        "content-type must be multipart/mixed with a valid boundary"
      );
    });

    it("throws when multipart request body present but content-type is not multipart", async function() {
      assert.rejects(
        async () =>
          await performRequest({
            headers: createHttpHeaders({
              "content-type": "application/json",
            }),
            body: {
              parts: [],
            },
          }),
        "Got multipart request body, but content-type header was not multipart: application/json"
      );
    });

    it("generates boundary when none specified in existing header", async function() {
      const request = await performRequest({
        headers: createHttpHeaders({
          "content-type": "multipart/alternative",
        }),
        body: {
          parts: [],
        },
      });

      assert.ok(request.headers.has("content-type"), "content-type header expected");
      assert.match(
        request.headers.get("content-type")!,
        /multipart\/alternative; boundary=[0-9a-zA_Z'()+,-./:=?]/,
        "content-type must be multipart/alternative with a valid boundary"
      );
    });

    it("preserves boundary when it is already specified", async function() {
      const request = await performRequest({
        headers: createHttpHeaders({
          "content-type": "multipart/form-data; boundary=blah",
        }),
        body: {
          parts: [],
        },
      });

      assert.equal(
        request.headers.get("content-type"),
        "multipart/form-data; boundary=blah",
        "fully specified content-type header should be preserved"
      );
    });

    it("sets the boundary when it is specified in the multipart request body", async function() {
      const request = await performRequest({
        headers: createHttpHeaders({
          "content-type": "multipart/alternative",
        }),
        body: {
          boundary: "blah",
          parts: [],
        },
      });

      assert.equal(
        request.headers.get("content-type"),
        "multipart/alternative; boundary=blah",
        "boundary was not added"
      );
    });
  });

  describe("multipart request body", async function() {

  })
});
