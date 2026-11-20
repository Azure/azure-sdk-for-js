// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { assert, describe, it } from "vitest";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest, isRestError } from "@azure/core-rest-pipeline";
import { storageServiceErrorPolicy } from "../../src/policies/StorageServiceErrorPolicy.js";
import { readStreamedBody as readStreamedBodyInBrowsers } from "../../src/utils/readStreamedBody-browser.mjs";
import { readStreamedBody as readStreamedBodyInReactNative } from "../../src/utils/readStreamedBody-react-native.mjs";

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

/** Sends a request through the policy, with a `next` that answers 404 with the given streamed body. */
function sendStreamed(
  body: Pick<PipelineResponse, "readableStreamBody" | "browserStreamBody" | "blobBody">,
  request: PipelineRequest = createRequest(),
): { response: PipelineResponse; result: Promise<PipelineResponse> } {
  const response: PipelineResponse = {
    request,
    status: 404,
    headers: createHttpHeaders({ "content-type": "application/xml" }),
    ...body,
  };
  const result = storageServiceErrorPolicy().sendRequest(request, async () => response);
  return { response, result };
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

async function readText(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString();
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

  it("reads the body of a streamed error, and leaves the request's streamed statuses alone", async () => {
    const body = errorXml("BlobNotFound", MESSAGE);
    const bytes = Buffer.from(body);
    // Chunks that split the byte-order mark, then text chunks.
    for (const chunks of [[bytes.subarray(0, 2), bytes.subarray(2)], [body]]) {
      const request = createRequest();
      const everyStatus = new Set([Number.POSITIVE_INFINITY]);
      request.streamResponseStatusCodes = everyStatus;
      let streamed: Set<number> | undefined;

      const error = await getError(
        storageServiceErrorPolicy().sendRequest(request, async (sent) => {
          streamed = sent.streamResponseStatusCodes;
          return {
            request: sent,
            status: 404,
            headers: createHttpHeaders(),
            readableStreamBody: Readable.from(chunks),
          };
        }),
      );

      assert.equal(error.message, MESSAGE);
      assert.equal(error.response.bodyAsText, body);
      assert.isUndefined(error.response.readableStreamBody);
      assert.strictEqual(streamed, everyStatus);
    }
  });

  it("returns a streamed error that isn't a storage error with an unread copy of its body", async () => {
    const page = "<html><body><h2>Bad Request - Invalid URL</h2></body></html>";
    const { response, result } = sendStreamed({
      readableStreamBody: Readable.from([Buffer.from(page)]),
    });

    assert.strictEqual(await result, response);
    assert.equal(await readText(response.readableStreamBody!), page);
  });

  it("returns a streamed error whose body is cut short while the caller's signal is live", async () => {
    // A cut connection, and the HTTP client giving up on the body on its own.
    const timedOut = Object.assign(new Error("The operation was aborted."), { name: "AbortError" });
    for (const failure of [new Error("aborted"), timedOut]) {
      const request = createRequest();
      request.abortSignal = new AbortController().signal;
      const cut = new Readable({
        read() {
          this.destroy(failure);
        },
      });
      const { response, result } = sendStreamed({ readableStreamBody: cut }, request);

      assert.strictEqual(await result, response, failure.name);
      assert.isUndefined(response.readableStreamBody, failure.name);
    }
  });

  it("rethrows the error of a body read the caller aborted", async () => {
    const request = createRequest();
    request.abortSignal = AbortSignal.abort();
    const aborted = new Error("The operation was aborted.");
    aborted.name = "AbortError";
    const stream = new Readable({
      read() {
        this.destroy(aborted);
      },
    });

    let failure: unknown;
    try {
      await sendStreamed({ readableStreamBody: stream }, request).result;
    } catch (error: unknown) {
      failure = error;
    }
    assert.strictEqual(failure, aborted);
  });

  it("passes on a failure to send the request", async () => {
    const sendError = new Error("socket hang up");

    let failure: unknown;
    try {
      await storageServiceErrorPolicy().sendRequest(createRequest(), async () => {
        throw sendError;
      });
    } catch (error: unknown) {
      failure = error;
    }
    assert.strictEqual(failure, sendError);
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

describe("readStreamedBody", () => {
  const body = "<Error><Code>BlobNotFound</Code></Error>";

  function streamed(parts: Partial<PipelineResponse>): PipelineResponse {
    return { request: createRequest(), status: 404, headers: createHttpHeaders(), ...parts };
  }

  it("reads a browser stream in browsers, and leaves an unread copy on the response", async () => {
    const response = streamed({ browserStreamBody: new Response(body).body! });

    assert.equal(await readStreamedBodyInBrowsers(response), body, "the text");
    assert.equal(await new Response(response.browserStreamBody).text(), body, "the copy");
  });

  it("reads a Blob in browsers", async () => {
    const response = streamed({ blobBody: Promise.resolve(new Blob([body])) });

    assert.equal(await readStreamedBodyInBrowsers(response), body);
  });

  it("reads nothing in browsers when the response streamed no body", async () => {
    assert.isUndefined(await readStreamedBodyInBrowsers(streamed({})));
  });

  it("reads nothing in React Native", async () => {
    const response = streamed({ blobBody: Promise.resolve(new Blob([body])) });

    assert.isUndefined(await readStreamedBodyInReactNative(response));
  });
});
