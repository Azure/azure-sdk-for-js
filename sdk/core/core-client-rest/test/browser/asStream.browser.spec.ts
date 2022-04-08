// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getClient } from "../../src/getClient";
import sinon from "sinon";
import { delay } from "@azure/core-util";

function createResponse(statusCode: number, body = "", chunkDelay = 0): Response {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const view = encoder.encode(body);

      if (view.length > 1) {
        const first = view.slice(0, 1);
        const second = view.slice(1);
        controller.enqueue(first);
        await delay(chunkDelay);
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

describe.only("[Browser] getClient", () => {
  let fetchMock: sinon.SinonStub;
  beforeEach(() => {
    fetchMock = sinon.stub(self, "fetch");
  });

  afterEach(() => {
    sinon.restore();
    fetchMock.restore();
  });

  it("should get a JSON body response as a stream", async () => {
    const responseText = "An appropriate response.";
    fetchMock.returns(createResponse(200, responseText, 1000));

    const client = getClient(mockBaseUrl);
    const result = await client.pathUnchecked("/foo").get().asBrowserStream();
    const reader = result.body!.getReader();
    // Read the first chunk
    const chunk = await reader.read();
    assert.equal(chunk.done, false);
  });

  it("should get a JSON body response", async () => {
    const responseText = "An appropriate response.";

    const client = getClient(mockBaseUrl);
    fetchMock.returns(createResponse(200, responseText, 1000));

    const result = await client
      .pathUnchecked("/foo")
      .get()
      .then((r) => r);

    assert.deepEqual(result.body, responseText);
  });
});
