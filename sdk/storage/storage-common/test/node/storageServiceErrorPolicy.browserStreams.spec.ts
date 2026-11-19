// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ReadableStream } from "node:stream/web";
import { assert, describe, it, vi } from "vitest";
import type { PipelineResponse, RestError } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest, isRestError } from "@azure/core-rest-pipeline";
import { storageServiceErrorPolicy } from "../../src/policies/StorageServiceErrorPolicy.js";

// The policy as browsers build it, with the reader of browser streams.
vi.mock(
  "../../src/utils/readStreamedBody.js",
  () => import("../../src/utils/readStreamedBody-browser.mjs"),
);

function send(
  status: number,
  browserStreamBody: NonNullable<PipelineResponse["browserStreamBody"]>,
): Promise<PipelineResponse> {
  const request = createPipelineRequest({
    url: "https://myaccount.blob.core.windows.net/container/blob",
  });
  return storageServiceErrorPolicy().sendRequest(request, async () => ({
    request,
    status,
    headers: createHttpHeaders(),
    browserStreamBody,
  }));
}

describe("storageServiceErrorPolicy with browser streams", () => {
  it("reads a storage error from a browser stream", async () => {
    const xml =
      "<Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.</Message></Error>";

    let failure: unknown;
    try {
      await send(404, new Response(xml).body!);
    } catch (error: unknown) {
      failure = error;
    }
    assert.isTrue(isRestError(failure));
    assert.equal((failure as Error).message, "The specified blob does not exist.");
    assert.equal((failure as RestError).response?.bodyAsText, xml);
    assert.isUndefined((failure as RestError).response?.browserStreamBody);
  });

  it("returns other errors with a body the generated code can still wrap", async () => {
    const page = "<html><body>Bad Request</body></html>";
    const html = await send(400, new Response(page).body!);
    const cut = await send(
      503,
      new ReadableStream<Uint8Array>({
        pull: (controller) => controller.error(new TypeError("network error")),
      }),
    );

    // The generated code reads the body of an error response through a `Response`.
    assert.equal(await new Response(html.browserStreamBody).text(), page);
    assert.equal((await new Response(cut.browserStreamBody).blob()).size, 0);
  });
});
