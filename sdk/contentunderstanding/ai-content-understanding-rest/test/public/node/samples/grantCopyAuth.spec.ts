// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for grantCopyAuth.ts - Grant copy authorization for cross-resource copy.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { ContentUnderstandingClient } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient } from "./sampleTestUtils.js";

describe("Sample: grantCopyAuth", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should verify cross-resource copy authorization flow exists", async () => {
    // This test verifies the grantCopyAuthorization method exists
    // Full cross-resource testing requires additional environment setup

    // Verify the method exists on the client
    assert.ok(
      typeof client.grantCopyAuthorization === "function",
      "grantCopyAuthorization method should exist",
    );
    console.log("grantCopyAuthorization method is available");

    // Note: Full cross-resource copy testing requires:
    // - CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID
    // - CONTENTUNDERSTANDING_SOURCE_REGION
    // - CONTENTUNDERSTANDING_TARGET_ENDPOINT
    // - CONTENTUNDERSTANDING_TARGET_RESOURCE_ID
    // - CONTENTUNDERSTANDING_TARGET_REGION

    console.log("Note: Full cross-resource copy requires additional environment configuration");
  });
});
