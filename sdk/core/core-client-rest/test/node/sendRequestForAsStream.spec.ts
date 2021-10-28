// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { sendRequestForAsStream } from "../../src/sendRequest";
import { assert } from "chai";
import { createEmptyPipeline, Pipeline } from "@azure/core-rest-pipeline";
import { ClientRequest, IncomingHttpHeaders, IncomingMessage } from "http";
import { PassThrough } from "stream";
import * as sinon from "sinon";
import * as https from "https";
import { HttpNodeStreamResponse } from "../../src";

function createRequest(): ClientRequest {
  const request = new FakeRequest();
  return (request as unknown) as ClientRequest;
}

class FakeResponse extends PassThrough {
  public statusCode?: number;
  public headers?: IncomingHttpHeaders;
}

class FakeRequest extends PassThrough {}

describe("sendRequestForAsStream", () => {
  let stubbedHttpsRequest: sinon.SinonStub;

  beforeEach(function () {
    stubbedHttpsRequest = sinon.stub(https, "request");
  });

  afterEach(function () {
    sinon.restore();
  });

  const mockBaseUrl = "https://example.org";
  it("should get a JSON body response", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    const expectedBody = { foo: "foo" };
    const clientRequest = createRequest();
    stubbedHttpsRequest.returns(clientRequest);

    const promise = sendRequestForAsStream("POST", mockBaseUrl, mockPipeline);
    stubbedHttpsRequest.yield(createResponse(200, JSON.stringify(expectedBody)));
    const response = await promise;

    assert.deepEqual(response.body, expectedBody);
  });

  it("should get a JSON body response as a stream", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    const expectedBody = { foo: "foo" };
    const clientRequest = createRequest();
    stubbedHttpsRequest.returns(clientRequest);

    const promise = sendRequestForAsStream("POST", mockBaseUrl, mockPipeline, {
      responseAsStream: true,
    });
    stubbedHttpsRequest.yield(createResponse(200, JSON.stringify(expectedBody)));
    const response = (await promise) as HttpNodeStreamResponse;

    const stringBody = await readStreamToBuffer(response.body);

    assert.deepEqual(stringBody.toString(), JSON.stringify(expectedBody));
  });
});

function createResponse(statusCode: number, body = ""): IncomingMessage {
  const response = new FakeResponse();
  response.headers = {};
  response.statusCode = statusCode;
  response.write(body);
  response.end();
  return (response as unknown) as IncomingMessage;
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
