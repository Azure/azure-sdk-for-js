// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for analyzeReturnRawJson.ts - Access the raw JSON response.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  TEST_INVOICE_URL,
} from "./sampleTestUtils.js";

describe("Sample: analyzeReturnRawJson", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should analyze and access operation ID for raw JSON retrieval", async () => {
    const poller = client.analyze("prebuilt-documentSearch", {
      inputs: [{ url: TEST_INVOICE_URL }],
      ...testPollingOptions,
    });

    await poller.pollUntilDone();

    // Get the operation ID from the poller to retrieve the full result
     
    const operationLocation = (poller as any).operationState?.config?.operationLocation;
    assert.ok(operationLocation, "Should have operation location from poller");

    const operationIdMatch = operationLocation.match(/analyzerResults\/([^?]+)/);
    assert.ok(operationIdMatch, "Should be able to extract operation ID");

    const operationId = operationIdMatch[1];
    console.log(`Operation ID: ${operationId}`);

    // Use getResult to retrieve the result status
    const operationStatus = await client.getResult(operationId);
    assert.ok(operationStatus, "Operation status should not be null");
    assert.equal(operationStatus.status, "Succeeded", "Operation should have succeeded");
    console.log(`Operation status: ${operationStatus.status}`);

    if (operationStatus.result) {
      console.log(`Result contains ${operationStatus.result.contents?.length ?? 0} content(s)`);
    }
  });
});
