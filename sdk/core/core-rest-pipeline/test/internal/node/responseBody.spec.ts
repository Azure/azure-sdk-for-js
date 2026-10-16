// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { createHttpHeaders, createPipelineRequest } from "../../../src/index.js";
import { disposeResponseBody } from "../../../src/util/responseBody.js";

describe("disposeResponseBody", () => {
  it("ignores cancellation failure from an errored browser stream", async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.error(new Error("response failed"));
      },
    });
    const request = createPipelineRequest({ url: "https://example.com" });

    await expect(
      disposeResponseBody({
        request,
        headers: createHttpHeaders(),
        status: 503,
        browserStreamBody: stream,
      }),
    ).resolves.toBeUndefined();
  });
});
