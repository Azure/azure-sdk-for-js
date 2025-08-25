// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineResponse } from "@azure/core-rest-pipeline";
import {
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import type { KeyCredential } from "@azure/core-auth";
import { createCommunicationAccessKeyCredentialPolicy } from "@azure/communication-common";
import { isNodeLike } from "@azure/core-util";
import { set } from "mockdate";
import { describe, it, assert } from "vitest";

const date = "2022-04-13T18:09:12.451Z";
set(date); // Any request to Date will return this date

describe("CommunicationKeyCredentialPolicy", function () {
  it("signs the request", async function () {
    const authHeader = await verifyHeadersForUrlReturnAuthHeader("https://example.com");
    assert.isNotEmpty(authHeader);
  });
});

describe("CommunicationKeyCredentialPolicy", function () {
  it("signs the request correctly with path and query params", async function () {
    const authHeader = await verifyHeadersForUrlReturnAuthHeader(
      "https://example.com/testPath?testQuery=test",
    );
    assert.equal(
      authHeader,
      "HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=DGdgwggJWnQyc6EHjR/Vbqg1ES64KpD6U2XwTDDj3tU=",
    );
  });
});

describe("CommunicationKeyCredentialPolicy", function () {
  it("signs the request correctly with path and no query param", async function () {
    const authHeader = await verifyHeadersForUrlReturnAuthHeader("https://example.com/testPath");
    assert.equal(
      authHeader,
      "HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=+6tWkg3lNKVjQHHmxkdGQcJjUgzclsWTMebnuCz1ngU=",
    );
  });
});

async function verifyHeadersForUrlReturnAuthHeader(urlToTest: string): Promise<string> {
  const credential = new MockKeyCredential("pw==");
  const communicationKeyCredentialPolicy = createCommunicationAccessKeyCredentialPolicy(credential);

  const pipelineRequest = createPipelineRequest({
    url: urlToTest,
  });

  const responses: PipelineResponse[] = [
    {
      headers: createHttpHeaders(),
      request: pipelineRequest,
      status: 200,
    },
  ];

  const testHttpsClient: HttpClient = {
    sendRequest: async (req) => {
      if (responses.length) {
        const response = responses.shift()!;
        response.request = req;
        return response;
      }
      throw new Error("No responses found");
    },
  };

  const pipeline = createEmptyPipeline();
  pipeline.addPolicy(communicationKeyCredentialPolicy);
  const pipelineResponse = await pipeline.sendRequest(testHttpsClient, pipelineRequest);

  const authHeader = pipelineResponse.request.headers.get("Authorization") || "";
  const dateHeader = pipelineResponse.request.headers.get("x-ms-date");
  const hashHeader = pipelineResponse.request.headers.get("x-ms-content-sha256");
  const hostHeader = pipelineResponse.request.headers.get("Host");

  assert.equal(dateHeader, "Wed, 13 Apr 2022 18:09:12 GMT");
  assert.equal(hashHeader, "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=");
  if (isNodeLike) {
    assert.isNotEmpty(hostHeader);
  }
  return authHeader;
}

class MockKeyCredential implements KeyCredential {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
}
