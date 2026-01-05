// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for analyzeReturnRawJson.ts - Return raw JSON from analysis.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  getSampleFilePath,
} from "./sampleTestUtils.js";
import fs from "node:fs";

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
    // Read the sample invoice file bytes
    const filePath = getSampleFilePath("sample_invoice.pdf");
    const fileBytes = fs.readFileSync(filePath);

    const poller = client.analyzeBinary("prebuilt-documentSearch", fileBytes, "application/pdf");

    await poller.pollUntilDone();

    // Get the operation ID from the poller to retrieve the full result

    const operationLocation = (poller as any).operationState?.config?.operationLocation;
    assert.ok(operationLocation, "Should have operation location from poller");

    const operationIdMatch = operationLocation.match(/analyzerResults\/([^?]+)/);
    assert.ok(operationIdMatch, "Should be able to extract operation ID");

    const operationId = operationIdMatch[1];
    console.log(`Operation ID: ${operationId}`);

    // Variable to capture raw JSON from onResponse callback
    let rawJson: string | undefined;

    // Use getResult to retrieve the result status and capture raw JSON
    const operationStatus = await client.getResult(operationId, {
      onResponse: (response) => {
        rawJson = response.bodyAsText;
      },
    });

    assert.ok(operationStatus, "Operation status should not be null");
    assert.equal(operationStatus.status, "Succeeded", "Operation should have succeeded");
    console.log(`Operation status: ${operationStatus.status}`);

    // Verify raw JSON was captured
    assert.ok(rawJson, "Should have captured raw JSON");
    const parsedRawJson = JSON.parse(rawJson!);
    assert.equal(parsedRawJson.status, "Succeeded", "Parsed raw JSON should have correct status");

    if (operationStatus.result) {
      console.log(`Result contains ${operationStatus.result.contents?.length ?? 0} content(s)`);
    }
  });
});
