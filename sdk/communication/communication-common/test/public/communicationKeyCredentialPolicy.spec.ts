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
import { createCommunicationAccessKeyCredentialPolicy } from "../../src";
import { isNode } from "@azure/core-util";
import { shaHMAC, shaHash } from "../../src/credential/cryptoUtils";

describe("CommunicationKeyCredentialPolicy", function () {
  it("signs the request", async function () {
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

describe("CommunicationKeyCredentialPolicy", function () {
  it("signs the request correctly with path and query params", async function () {
    const credential = new MockKeyCredential("pw==");
    const communicationKeyCredentialPolicy =
      createCommunicationAccessKeyCredentialPolicy(credential);

    const pipelineRequest = createPipelineRequest({
      url: "https://example.com/testPath?testQuery",
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

    const authHeader = pipelineResponse.request.headers.get("Authorization");
    const dateHeader = pipelineResponse.request.headers.get("x-ms-date");
    const hashHeader = pipelineResponse.request.headers.get("x-ms-content-sha256");
    const hostHeader = pipelineResponse.request.headers.get("Host");

    const authHeaderExpected = await generateAuthHeader(
      pipelineRequest.method.toLocaleUpperCase(),
      dateHeader || "",
      credential.key,
      "/testPath?testQuery=",
      "example.com"
    );

    assert.equal(authHeader, authHeaderExpected);
    assert.isNotEmpty(dateHeader);
    assert.isNotEmpty(hashHeader);
    if (isNode) {
      assert.isNotEmpty(hostHeader);
    }
  });
});

describe("CommunicationKeyCredentialPolicy", function () {
  it("signs the request correctly with path and no query", async function () {
    const credential = new MockKeyCredential("pw==");
    const communicationKeyCredentialPolicy =
      createCommunicationAccessKeyCredentialPolicy(credential);

    const pipelineRequest = createPipelineRequest({ url: "https://example.com/testPath" });

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

    const authHeaderExpected = await generateAuthHeader(
      pipelineRequest.method.toLocaleUpperCase(),
      dateHeader || "",
      credential.key,
      "/testPath",
      "example.com"
    );

    assert.equal(authHeader, authHeaderExpected);
    assert.isNotEmpty(dateHeader);
    assert.isNotEmpty(hashHeader);
    if (isNode) {
      assert.isNotEmpty(hostHeader);
    }
  });
});

async function generateAuthHeader(
  verb: string,
  dateHeader: string,
  key: string,
  pathAndQuery: string,
  hostAndPort: string
): Promise<string> {
  const signedHeaders = `x-ms-date;host;x-ms-content-sha256`;
  const contentHash = await shaHash("");
  const stringToSign = `${verb}\n${pathAndQuery}\n${dateHeader};${hostAndPort};${contentHash}`;
  const signature = await shaHMAC(key, stringToSign);
  return `HMAC-SHA256 SignedHeaders=${signedHeaders}&Signature=${signature}`;
}

class MockKeyCredential implements KeyCredential {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
}
