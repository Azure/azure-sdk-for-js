// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it, vi } from "vitest";
import type * as CoreUtil from "@azure/core-util";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { storageServiceErrorPolicy } from "../../src/policies/StorageServiceErrorPolicy.js";

vi.mock("@azure/core-util", async (importOriginal) => ({
  ...(await importOriginal<typeof CoreUtil>()),
  isReactNative: true,
}));

describe("storageServiceErrorPolicy on React Native", () => {
  it("leaves the streamed statuses of a request that streams every status alone", async () => {
    const request = createPipelineRequest({
      url: "https://myaccount.blob.core.windows.net/container/blob",
    });
    const everyStatus = new Set([Number.POSITIVE_INFINITY]);
    request.streamResponseStatusCodes = everyStatus;
    let streamed: Set<number> | undefined;

    await storageServiceErrorPolicy().sendRequest(request, async (sent) => {
      streamed = sent.streamResponseStatusCodes;
      return { request: sent, status: 404, headers: createHttpHeaders() };
    });

    assert.strictEqual(streamed, everyStatus);
  });
});
