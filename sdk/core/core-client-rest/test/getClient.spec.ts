// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as https from "https";
import { assert } from "chai";
import { getCachedDefaultHttpsClient } from "../src/clientHelpers";
import { getClient } from "../src/getClient";
import sinon from "sinon";
import {
  createHttpHeaders,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

import { ClientRequest, IncomingHttpHeaders, IncomingMessage } from "http";
import { PassThrough } from "stream";

const mockBaseUrl = "https://example.org";

describe("getClient", () => {
  afterEach(() => {
    sinon.reset();
    sinon.restore();
  });

  let stubbedHttpsRequest: sinon.SinonStub;
  beforeEach(function () {
    stubbedHttpsRequest = sinon.stub(https, "request");
  });

  it("should get a JSON body response as a stream", async () => {
    const client = getClient(mockBaseUrl);
    const expectedBody = { foo: "foo" };
    const clientRequest = createRequest();
    stubbedHttpsRequest.returns(clientRequest);

    const promise = client.pathUnchecked("/foo").get().asNodeStream();

    stubbedHttpsRequest.yield(createResponse(200, JSON.stringify(expectedBody)));

    const response = await promise;
    console.log(JSON.stringify(response));
    const stringBody = await readStreamToBuffer(response.body!);

    assert.deepEqual(stringBody.toString(), JSON.stringify(expectedBody));
  });

  it("should get a JSON body response", async () => {
    const client = getClient(mockBaseUrl);
    const expectedBody = { foo: "foo" };
    const clientRequest = createRequest();
    stubbedHttpsRequest.returns(clientRequest);

    const promise = client
      .pathUnchecked("/foo")
      .get()
      .then((r) => r);

    stubbedHttpsRequest.yield(createResponse(200, JSON.stringify(expectedBody)));

    const response = await promise;

    assert.deepEqual(response.body, expectedBody);
  });

  it("should add apiVersion to requests", async () => {
    const defaultHttpClient = getCachedDefaultHttpsClient();
    sinon.stub(defaultHttpClient, "sendRequest").callsFake(async (req) => {
      return { headers: createHttpHeaders(), status: 200, request: req } as PipelineResponse;
    });

    const apiVersion = "2021-11-18";
    const client = getClient("https://example.org?api-version=1233321", { apiVersion });
    const validationPolicy: PipelinePolicy = {
      name: "validationPolicy",
      sendRequest: (req, next) => {
        assert.include(req.url, `api-version=${apiVersion}`);
        return next(req);
      },
    };

    client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });

    await client.pathUnchecked("/foo").get();
  });

  it("should insert policies in the correct pipeline position", async function () {
    const sendRequest = (request: PipelineRequest, next: SendRequest) => next(request);
    const retryPolicy: PipelinePolicy = {
      name: "retry",
      sendRequest,
    };
    const policy1: PipelinePolicy = {
      name: "policy1",
      sendRequest,
    };
    const policy2: PipelinePolicy = {
      name: "policy2",
      sendRequest,
    };

    const client = getClient("https://example.org?api-version=1233321", {
      additionalPolicies: [
        { policy: policy1, position: "perRetry" },
        { policy: policy2, position: "perCall" },
      ],
    });
    client.pipeline.addPolicy(retryPolicy, { phase: "Retry" });
    assert(client);
    const policies = client.pipeline.getOrderedPolicies();
    assert.isTrue(policies.indexOf(policy2) < policies.indexOf(retryPolicy));
    assert.isTrue(policies.indexOf(retryPolicy) < policies.indexOf(policy1));
  });
});

function createRequest(): ClientRequest {
  const request = new FakeRequest();
  return request as unknown as ClientRequest;
}

class FakeResponse extends PassThrough {
  public statusCode?: number;
  public headers?: IncomingHttpHeaders;
}

function createResponse(statusCode: number, body = ""): IncomingMessage {
  const response = new FakeResponse();
  response.headers = {};
  response.statusCode = statusCode;
  response.write(body);
  response.end();
  return response as unknown as IncomingMessage;
}
function readStreamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("error", reject);
    stream.on("data", function (chunk: Buffer) {
      chunks.push(chunk);
    });
    stream.on("end", function () {
      resolve(Buffer.concat(chunks));
    });
  });
}

class FakeRequest extends PassThrough {}
