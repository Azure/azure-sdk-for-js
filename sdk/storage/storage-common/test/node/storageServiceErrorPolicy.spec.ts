// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest, isRestError } from "@azure/core-rest-pipeline";
import { storageServiceErrorPolicy } from "../../src/policies/StorageServiceErrorPolicy.js";

const MESSAGE =
  "The specified blob does not exist.\nRequestId:4f6c8f4a-001e-0035-3a6b-1f3b0d000000\nTime:2026-11-17T00:00:00.0000000Z";

/** A storage error body as the service sends it, which starts with a byte-order mark. */
function errorXml(code: string, message: string, extra: string = ""): string {
  return `\uFEFF<?xml version="1.0" encoding="utf-8"?><Error><Code>${code}</Code><Message>${message}</Message>${extra}</Error>`;
}

function createRequest(): PipelineRequest {
  return createPipelineRequest({ url: "https://myaccount.blob.core.windows.net/container/blob" });
}

/** Sends a request through the policy, with a `next` that answers with the given response. */
function send(
  status: number,
  body?: string,
  headers: Record<string, string> = {},
): { request: PipelineRequest; response: PipelineResponse; result: Promise<PipelineResponse> } {
  const request = createRequest();
  const response: PipelineResponse = {
    request,
    status,
    headers: createHttpHeaders({ "content-type": "application/xml", ...headers }),
    bodyAsText: body,
  };
  const result = storageServiceErrorPolicy().sendRequest(request, async () => response);
  return { request, response, result };
}

async function getError(result: Promise<unknown>): Promise<any> {
  try {
    await result;
  } catch (error: unknown) {
    assert.isTrue(isRestError(error));
    return error;
  }
  assert.fail("The request should have failed.");
}

describe("storageServiceErrorPolicy", () => {
  it("throws the service's message, code and details for a storage error", async () => {
    const body = errorXml("BlobNotFound", MESSAGE);
    const { request, response, result } = send(404, body, { "x-ms-error-code": "BlobNotFound" });

    const error = await getError(result);

    assert.equal(error.message, MESSAGE);
    assert.equal(error.code, "BlobNotFound");
    assert.equal(error.statusCode, 404);
    assert.strictEqual(error.request, request);
    assert.strictEqual(error.response, response);
    assert.equal(error.response.bodyAsText, body);
    assert.deepEqual(error.details, {
      code: "BlobNotFound",
      message: MESSAGE,
      additionalProperties: {},
      errorCode: "BlobNotFound",
    });
  });

  it("takes the code from the body when no header gives it", async () => {
    const { result } = send(404, errorXml("BlobNotFound", MESSAGE));

    const error = await getError(result);

    assert.equal(error.code, "BlobNotFound");
    assert.isUndefined(error.details.errorCode);
    assert.isUndefined((await getError(send(404, errorXml("", MESSAGE)).result)).code);
  });

  it("prefers the code in the header to the one in the body", async () => {
    const { result } = send(404, errorXml("BodyCode", MESSAGE), {
      "x-ms-error-code": "HeaderCode",
    });

    const error = await getError(result);

    assert.equal(error.code, "HeaderCode");
    assert.equal(error.details.code, "BodyCode");
    assert.equal(error.details.errorCode, "HeaderCode");
  });

  it("names the error fields as the clients do", async () => {
    const detail = "Signature did not match. String to sign used was r";
    const { result } = send(
      409,
      errorXml(
        "CannotVerifyCopySource",
        "The source could not be verified.",
        "<CopySourceStatusCode>404</CopySourceStatusCode><CopySourceErrorCode>BlobNotFound</CopySourceErrorCode>" +
          "<CopySourceErrorMessage>The specified blob does not exist.</CopySourceErrorMessage>" +
          `<AuthenticationErrorDetail>${detail}</AuthenticationErrorDetail><HeaderName>x-ms-copy-source</HeaderName>`,
      ),
      {
        "x-ms-error-code": "CannotVerifyCopySource",
        "x-ms-copy-source-error-code": "BlobNotFound",
        "x-ms-copy-source-status-code": "404",
      },
    );

    const error = await getError(result);

    assert.deepEqual(error.details, {
      code: "CannotVerifyCopySource",
      message: "The source could not be verified.",
      copySourceStatusCode: 404,
      copySourceErrorCode: "BlobNotFound",
      copySourceErrorMessage: "The specified blob does not exist.",
      authenticationErrorDetail: detail,
      HeaderName: "x-ms-copy-source",
      additionalProperties: { AuthenticationErrorDetail: detail, HeaderName: "x-ms-copy-source" },
      errorCode: "CannotVerifyCopySource",
      xMsCopySourceErrorCode: "BlobNotFound",
      xMsCopySourceStatusCode: 404,
    });
    assert.include(error.response.parsedBody, {
      code: "CannotVerifyCopySource",
      HeaderName: "x-ms-copy-source",
    });
  });

  it("keeps the status in the message when the error has no message", async () => {
    const { result } = send(
      409,
      '<?xml version="1.0" encoding="utf-8"?><Error><Code>LeaseAlreadyPresent</Code></Error>',
    );

    const error = await getError(result);

    assert.equal(error.message, "Unexpected status code: 409");
    assert.equal(error.code, "LeaseAlreadyPresent");
  });

  it("ignores the whitespace, nested and repeated elements of an error", async () => {
    const body = `\uFEFF<?xml version="1.0" encoding="utf-8"?>\n<Error>\n  <Code>BlobNotFound</Code>\n  <Message>${MESSAGE}</Message>\n  <Detail><Reason>x</Reason></Detail>\n  <Hint>a</Hint>\n  <Hint>b</Hint>\n</Error>`;

    const error = await getError(send(404, body).result);

    assert.deepEqual(error.details, {
      code: "BlobNotFound",
      message: MESSAGE,
      additionalProperties: {},
      errorCode: undefined,
    });
  });

  it("returns responses that aren't storage errors", async () => {
    const cases: Array<[string, number, string | undefined]> = [
      ["a success with an error body", 200, errorXml("BlobNotFound", MESSAGE)],
      ["an error without a body", 404, undefined],
      ["a JSON error", 404, JSON.stringify({ error: { code: "PathNotFound", message: MESSAGE } })],
      ["an HTML page", 400, "<html><body><h2>Bad Request - Invalid URL</h2></body></html>"],
      ["XML with another root", 500, '<?xml version="1.0"?><Fault><Code>X</Code></Fault>'],
      ["an error without a code or message", 400, "<Error><Reason>unknown</Reason></Error>"],
      ["a cut-off body", 400, '<?xml version="1.0"?><Error><Code>BlobNot'],
      [
        "an element name the parser refuses",
        400,
        "<Error><Code>X</Code><__proto__>p</__proto__></Error>",
      ],
    ];
    for (const [name, status, body] of cases) {
      const { response, result } = send(status, body);

      assert.strictEqual(await result, response, name);
    }
  });

  it("streams only successful responses of a request that streams every status", async () => {
    const request = createRequest();
    const everyStatus = new Set([Number.POSITIVE_INFINITY]);
    request.streamResponseStatusCodes = everyStatus;
    let streamed: Set<number> | undefined;

    await storageServiceErrorPolicy().sendRequest(request, async (sent) => {
      streamed = sent.streamResponseStatusCodes;
      return { request: sent, status: 200, headers: createHttpHeaders() };
    });

    assert.isTrue(streamed?.has(200));
    assert.isTrue(streamed?.has(206));
    assert.isFalse(streamed?.has(404));
    assert.isFalse(streamed?.has(Number.POSITIVE_INFINITY));
    assert.strictEqual(request.streamResponseStatusCodes, everyStatus);
  });

  it("restores the streamed statuses when the request fails without a response", async () => {
    const request = createRequest();
    const everyStatus = new Set([Number.POSITIVE_INFINITY]);
    request.streamResponseStatusCodes = everyStatus;

    const sent = storageServiceErrorPolicy().sendRequest(request, async () => {
      throw new Error("socket hang up");
    });

    let failure: unknown;
    try {
      await sent;
    } catch (error: unknown) {
      failure = error;
    }
    assert.equal((failure as Error | undefined)?.message, "socket hang up");
    assert.strictEqual(request.streamResponseStatusCodes, everyStatus);
  });

  it("leaves the streamed statuses of other requests alone", async () => {
    for (const statuses of [undefined, new Set([200, 206])]) {
      const request = createRequest();
      request.streamResponseStatusCodes = statuses;
      let streamed: Set<number> | undefined;

      await storageServiceErrorPolicy().sendRequest(request, async (sent) => {
        streamed = sent.streamResponseStatusCodes;
        return { request: sent, status: 200, headers: createHttpHeaders() };
      });

      assert.strictEqual(streamed, statuses);
    }
  });

  it("doesn't let element names replace inherited members", async () => {
    const { result } = send(
      400,
      errorXml(
        "InvalidXmlDocument",
        "XML specified is not syntactically valid.",
        "<isPrototypeOf>v</isPrototypeOf>",
      ),
    );

    const error = await getError(result);

    assert.typeOf(error.details.isPrototypeOf, "function");
    assert.typeOf(error.details.additionalProperties.isPrototypeOf, "function");
  });
});
