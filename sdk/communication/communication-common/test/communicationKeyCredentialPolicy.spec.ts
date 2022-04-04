// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  PipelineResponse,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { KeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { createCommunicationAccessKeyCredentialPolicy } from "../src/credential/communicationAccessKeyCredentialPolicy";
import { isNode } from "../src/credential/isNode";

describe("CommunicationKeyCredentialPolicy", () => {
  it("signs the request", async () => {
    const credential = new MockKeyCredential("pw==");
    const communicationKeyCredentialPolicy =
      createCommunicationAccessKeyCredentialPolicy(credential);

    const pipelineRequest = createPipelineRequest({ url: "https://example.com" });

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

    const authHeader = pipelineResponse.request.headers.get("Authorization");
    const dateHeader = pipelineResponse.request.headers.get("x-ms-date");
    const hashHeader = pipelineResponse.request.headers.get("x-ms-content-sha256");
    const hostHeader = pipelineResponse.request.headers.get("Host");

    assert.isNotEmpty(authHeader);
    assert.isNotEmpty(dateHeader);
    assert.isNotEmpty(hashHeader);
    if (isNode) {
      assert.isNotEmpty(hostHeader);
    }
  });
});

class MockKeyCredential implements KeyCredential {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
}
