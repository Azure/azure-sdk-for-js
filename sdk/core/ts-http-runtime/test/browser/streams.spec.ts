// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getClient } from "../../src/client/getClient";
import sinon from "sinon";

function createResponse(statusCode: number, body = ""): Response {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const view = encoder.encode(body);

      if (view.length > 1) {
        const first = view.slice(0, 1);
        const second = view.slice(1);
        controller.enqueue(first);
        controller.enqueue(second);
        controller.close();
      } else {
        controller.enqueue(view);
        controller.close();
      }
    },
  });
  return new Response(stream, { status: statusCode });
}

const mockBaseUrl = "https://example.org";

describe("[Browser] Streams", () => {
  let fetchMock: sinon.SinonStub;
  beforeEach(() => {
    fetchMock = sinon.stub(self, "fetch");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should get a JSON body response as a stream", async () => {
    const responseText = "An appropriate response.";
    fetchMock.returns(createResponse(200, responseText));

    const client = getClient(mockBaseUrl);
    const result = await client.pathUnchecked("/foo").get().asBrowserStream();
    const reader = result.body!.getReader();
    // Read the first chunk
    const chunk = await reader.read();
    assert.equal(chunk.done, false);
    assert.isTrue(fetchMock.calledOnce);
  });

  it("should get a JSON body response", async () => {
    const responseText = "An appropriate response.";

    const client = getClient(mockBaseUrl);
    fetchMock.returns(createResponse(200, responseText));

    const result = await client.pathUnchecked("/foo").get();

    assert.deepEqual(result.body, responseText);
    assert.isTrue(fetchMock.calledOnce);
  });

  it("should be able to handle errors on normal response", async () => {
    const client = getClient(mockBaseUrl);
    fetchMock.throwsException(new Error("ExpectedException"));
    try {
      await client.pathUnchecked("/foo").get();
    } catch (e: any) {
      assert.match(e.message, /ExpectedException/);
    }
  });

  it("should be able to handle errors on streamed response", async () => {
    const client = getClient(mockBaseUrl);
    fetchMock.throwsException(new Error("ExpectedException"));
    try {
      await client.pathUnchecked("/foo").get().asNodeStream();
    } catch (e: any) {
      assert.match(e.message, /ExpectedException/);
    }
  });
});
