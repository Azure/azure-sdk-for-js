// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HttpClient,
  PipelineResponse,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { KeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { createCommunicationAccessKeyCredentialPolicy } from "../../src";
import { isNode } from "@azure/core-util";
import { set } from "mockdate";

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
  if (isNode) {
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
