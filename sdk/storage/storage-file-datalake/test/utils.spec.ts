// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import {
  adjustResponse,
  sanitizeHeaders,
  sanitizeURL,
  extractConnectionStringParts,
  setUploadChecksumParameters,
} from "../src/utils/utils.common.js";
import { addStorageCompatResponse } from "../src/generated/static-helpers/storageCompatResponse.js";
import type { FullOperationResponse } from "@azure-rest/core-client";
import { describe, it, assert } from "vitest";

describe("Utility Helpers", () => {
  const accountName = "myaccount";
  const blobEndpoint = `https://${accountName}.blob.core.windows.net`;
  const sharedAccessSignature = "sasToken";

  function verifySASConnectionString(sasConnectionString: string): void {
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected.",
    );
    assert.equal(
      blobEndpoint,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected.",
    );
    assert.equal(
      accountName,
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected.",
    );
  }

  it("preserves the parsed body before flattening response headers", () => {
    const parsedBody = { etag: "body-etag", value: "body-value" };
    const parsedHeaders = { etag: "header-etag", requestId: "request-id" };
    const rawResponse = {
      request: createPipelineRequest({ url: "https://example.com" }),
      status: 200,
      headers: createHttpHeaders({ "x-ms-request-id": "request-id" }),
      bodyAsText: "response body",
    } as FullOperationResponse;

    const result = addStorageCompatResponse(rawResponse, parsedBody, parsedHeaders);

    assert.equal(result.etag, "header-etag");
    assert.deepEqual(result._response.parsedBody, {
      etag: "body-etag",
      value: "body-value",
    });
    assert.notStrictEqual(result._response.parsedBody, result);

    const adjustedResult = adjustResponse(result);
    assert.equal(adjustedResult._response.status, 200);
    assert.equal(adjustedResult._response.headers.get("x-ms-request-id"), "request-id");
    assert.equal(adjustedResult._response.bodyAsText, "response body");
    assert.deepEqual(adjustedResult._response.parsedBody, parsedBody);
    assert.notProperty(adjustedResult._response, "rawResponse");
  });

  it("sanitizeURL redacts SAS token", () => {
    const url = "https://some.url.com/container/blob?sig=sasstring";
    const sanitized = sanitizeURL(url);
    assert.strictEqual(sanitized.indexOf("sasstring"), -1, "Expecting SAS string to be redacted.");
    assert.notStrictEqual(sanitized.indexOf("*****"), -1, "Expecting SAS string to be redacted.");
  });

  it("sanitizeHeaders redacts SAS token", () => {
    const url = "https://some.url.com/container/blob?sig=sasstring";
    const headers = createHttpHeaders();
    headers.set("authorization", "Bearer abcdefg");
    headers.set("x-ms-copy-source", url);
    headers.set("otherheader", url);

    const sanitized = sanitizeHeaders(headers);
    assert.strictEqual(
      sanitized.get("x-ms-copy-source")!.indexOf("sasstring"),
      -1,
      "Expecting SAS string to be redacted.",
    );
    assert.notStrictEqual(
      sanitized.get("x-ms-copy-source")!.indexOf("*****"),
      -1,
      "Expecting SAS string to be redacted.",
    );
    assert.strictEqual(
      sanitized.get("authorization"),
      "*****",
      "Expecting authorization header value to be redacted.",
    );

    assert.notStrictEqual(
      sanitized.get("otherheader")!.indexOf("sasstring"),
      -1,
      "Other header should not be changed.",
    );
  });

  it("extractConnectionStringParts parses sas connection string with queue and file endpoints", async () => {
    verifySASConnectionString(
      `BlobEndpoint=${blobEndpoint};
        FileEndpoint=https://storagesample.file.core.windows.net;
        SharedAccessSignature=${sharedAccessSignature}`,
    );
  });

  it("extractConnectionStringParts parses sas connection string with queue endpoint", async () => {
    verifySASConnectionString(
      `BlobEndpoint=${blobEndpoint};
        FileEndpoint=https://storagesample.file.core.windows.net;
        SharedAccessSignature=${sharedAccessSignature}`,
    );
  });

  it("setUploadChecksumParameters flattens customized checksums", async () => {
    const transactionalContentMD5 = new Uint8Array([1, 2, 3]);
    const transactionalContentCrc64 = new Uint8Array([4, 5, 6]);
    const parameters: {
      transactionalContentHash?: Uint8Array;
      transactionalContentCrc64?: Uint8Array;
    } = {};

    await setUploadChecksumParameters(new Uint8Array([7, 8, 9]), 3, parameters, {
      transactionalContentMD5,
      transactionalContentCrc64,
    });

    assert.strictEqual(parameters.transactionalContentHash, transactionalContentMD5);
    assert.strictEqual(parameters.transactionalContentCrc64, transactionalContentCrc64);
  });
});
