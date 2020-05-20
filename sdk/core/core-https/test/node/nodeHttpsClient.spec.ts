// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { PassThrough } from "stream";
import { IncomingMessage, ClientRequest, IncomingHttpHeaders } from "http";
import * as https from "https";
import { DefaultHttpsClient } from "../../src";
import { createPipelineRequest } from "../../src/pipelineRequest";

class FakeResponse extends PassThrough {
  public statusCode?: number;
  public headers?: IncomingHttpHeaders;
}

function createResponse(statusCode: number): IncomingMessage {
  const response = new FakeResponse();
  response.headers = {};
  response.statusCode = statusCode;
  response.write("");
  response.end();
  return (response as unknown) as IncomingMessage;
}

function createRequest(): ClientRequest {
  const onStub = sinon.stub<[string, (...args: any[]) => void], ClientRequest>();
  const request: Partial<ClientRequest> = {
    finished: false,
    on: onStub,
    abort: sinon.stub(),
    write: sinon.stub<[any], boolean>(),
    end: sinon.stub<[Function | undefined]>()
  };
  onStub.returns(request as ClientRequest);

  return request as ClientRequest;
}

describe("NodeHttpsClient", function() {
  let stubbedRequest: sinon.SinonStub;

  beforeEach(function() {
    stubbedRequest = sinon.stub(https, "request");
  });

  afterEach(function() {
    sinon.restore();
  });

  it("shouldn't throw on 404", async function() {
    const client = new DefaultHttpsClient();
    stubbedRequest.returns(createRequest());
    const request = createPipelineRequest({ url: "https://example.com" });
    const promise = client.sendRequest(request);
    stubbedRequest.yield(createResponse(404));
    const response = await promise;
    assert.strictEqual(response.status, 404);
  });
});
