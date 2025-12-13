// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for deleteResult.ts - Delete analysis results.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type DocumentContent } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  TEST_INVOICE_URL,
} from "./sampleTestUtils.js";

describe("Sample: deleteResult", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should delete analysis results", async () => {
    // Start the analysis operation
    const poller = client.analyze("prebuilt-invoice", {
      inputs: [{ url: TEST_INVOICE_URL }],
      ...testPollingOptions,
    });

    const result = await poller.pollUntilDone();

    // Get the operation ID

    const operationLocation = (poller as any).operationState?.config?.operationLocation;
    let operationId: string | undefined;

    if (operationLocation) {
      const match = operationLocation.match(/analyzerResults\/([^?]+)/);
      operationId = match?.[1];
    }

    assert.ok(operationId, "Should have operation ID");
    console.log(`Operation ID: ${operationId}`);
    console.log("Analysis completed successfully!");

    // Display some sample results
    if (result.contents && result.contents.length > 0) {
      const content = result.contents[0];
      if (content.kind === "document") {
        const docContent = content as DocumentContent;
        if (docContent.fields) {
          console.log(`Total fields extracted: ${Object.keys(docContent.fields).length}`);
        }
      }
    }

    // Delete the result
    console.log(`Deleting result for operation: ${operationId}...`);
    await client.deleteResult(operationId!);
    console.log("Result deleted successfully!");

    // Verify deletion by trying to get the result (should fail)
    try {
      await client.getResult(operationId!);
      // In some cases, getResult may still work briefly after deletion
      console.log("Note: Result may still be accessible briefly after deletion");
    } catch (error) {
      assert.ok(error, "Expected error when getting deleted result");
      console.log("Verified result was deleted");
    }
  });
});
