// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import {
  adjustResponse,
  sanitizeHeaders,
  sanitizeURL,
  extractConnectionStringParts,
  isIpEndpointStyle,
  setURLParameter,
} from "../src/utils/utils.common.js";
import { addStorageCompatResponse } from "../src/generated/static-helpers/storageCompatResponse.js";
import type { FullOperationResponse } from "@azure-rest/core-client";
import { describe, it, assert } from "vitest";

describe("Utility Helpers", () => {
  const protocol = "https";
  const endpointSuffix = "core.windows.net";
  const accountName = "myaccount";
  const blobEndpoint = `${protocol}://${accountName}.blob.${endpointSuffix}`;
  const customDomainBlobEndpoint = `${protocol}://customdomain.com`;
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

  it("setURLParameter correctly updates parameters", () => {
    assert.equal(setURLParameter("http://test.com/", "a", "b"), "http://test.com/?a=b");
    assert.equal(
      setURLParameter("http://test.com/container/blob", "a", "b"),
      "http://test.com/container/blob?a=b",
    );
    assert.equal(
      setURLParameter("http://test.com/container/blob?a=b", "a", ""),
      "http://test.com/container/blob",
    );
    assert.equal(
      setURLParameter("http://test.com/container/blob?a=b", "a"),
      "http://test.com/container/blob",
    );
    assert.equal(
      setURLParameter("http://test.com/container/blob?a=b", "a", "c"),
      "http://test.com/container/blob?a=c",
    );
    assert.equal(
      setURLParameter("http://test.com/container/blob?a=b", "c", "d"),
      "http://test.com/container/blob?a=b&c=d",
    );
    assert.equal(
      setURLParameter("http://test.com/container/blob?a=b", "c", ""),
      "http://test.com/container/blob?a=b",
    );
    assert.equal(
      setURLParameter(
        "http://test.com/container/blob",
        "versionid",
        "2022-12-10T19:55:31.5767937Z",
      ),
      "http://test.com/container/blob?versionid=2022-12-10T19%3A55%3A31.5767937Z",
    );
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

  it("extractConnectionStringParts parses sas connection string with custom domain", async () => {
    const sasConnectionString = `BlobEndpoint=${customDomainBlobEndpoint};
    SharedAccessSignature=${sharedAccessSignature}`;
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected.",
    );
    assert.equal(
      customDomainBlobEndpoint,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected.",
    );
    assert.equal(
      "",
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected.",
    );
  });

  it("extractConnectionStringParts parses sas connection string with local domain", async () => {
    const localDomain = `http://localhost:10000/devstoreaccount1`;
    const sasConnectionString = `BlobEndpoint=${localDomain};
    SharedAccessSignature=${sharedAccessSignature}`;
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected.",
    );
    assert.equal(
      localDomain,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected.",
    );
    assert.equal(
      "devstoreaccount1",
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected.",
    );
  });

  it("extractConnectionStringParts parses sas connection string with localhost and custom port", async () => {
    const localDomain = `http://localhost:20000`;
    const sasConnectionString = `BlobEndpoint=${localDomain};
    SharedAccessSignature=${sharedAccessSignature}`;
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected.",
    );
    assert.equal(
      localDomain,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected.",
    );
    assert.equal(
      "",
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected.",
    );
  });

  it("extractConnectionStringParts parses sas connection string with custom domain", async () => {
    const localDomain = `http://host.docker.internal:10000`;
    const localAccountName = "devstoreaccount1";
    const sasConnectionString = `BlobEndpoint=${localDomain};
    SharedAccessSignature=${sharedAccessSignature};AccountName=${localAccountName}`;
    const connectionStringParts = extractConnectionStringParts(sasConnectionString);
    assert.equal(
      "SASConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected.",
    );
    assert.equal(
      localDomain,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected.",
    );
    assert.equal(
      localAccountName,
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected.",
    );
  });

  it("isIpEndpointStyle", async () => {
    assert.equal(
      isIpEndpointStyle(new URL("https://192.0.0.10:1900/accountName/containerName/blobName")),
      true,
    );
    assert.equal(
      isIpEndpointStyle(
        new URL(
          "https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/accountName/containerName/blobName",
        ),
      ),
      true,
    );
    assert.equal(
      isIpEndpointStyle(new URL("https://localhost:80/accountName/containerName/blobName")),
      true,
    );

    assert.equal(isIpEndpointStyle(new URL("https://192.0.0.10:1900/")), true);
    assert.equal(isIpEndpointStyle(new URL("https://192.0.0.10")), true);

    assert.equal(
      isIpEndpointStyle(
        new URL("https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]/accountName/containerName"),
      ),
      true,
    );
    assert.equal(isIpEndpointStyle(new URL("https://[::1]")), true);
    assert.equal(isIpEndpointStyle(new URL("https://a.b.c.d")), false);
  });
});
