// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for deleteResult.ts - Delete analysis results.
 *
 * Multi-version test: `deleteResult` is available on both GA and preview
 * surfaces, so `forEachServiceVersion` runs the assertions against each api
 * version in live mode. In playback mode only the
 * `RECORDING_SERVICE_API_VERSION` cell runs.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type DocumentContent } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  TEST_INVOICE_URL,
} from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";

forEachServiceVersion("Sample: deleteResult", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should delete analysis results", async () => {
    // Start the analysis operation
    const poller = client.analyze(
      "prebuilt-invoice",
      [{ url: TEST_INVOICE_URL }],
      testPollingOptions,
    );

    const result = await poller.pollUntilDone();

    // Get the operation ID

    const operationId = poller.operationState?.operationId;

    assert.ok(operationId, "Should have operation ID");
    console.log(`Operation ID: ${operationId}`);
    console.log("Analysis completed successfully!");

    // ========== Analysis result verification ==========
    // . These structural asserts are sample-controlled (we
    // requested prebuilt-invoice on a URL input) so they are portable.
    assert.ok(operationId!.length > 0, "Operation ID should have length > 0");
    assert.ok(!operationId!.includes(" "), "Operation ID should not contain spaces");
    assert.strictEqual(
      result.analyzerId,
      "prebuilt-invoice",
      "Result analyzerId should match the analyzer used for analysis",
    );
    assert.ok(result.contents, "Analysis result should contain contents");
    assert.ok(result.contents!.length > 0, "Result should have at least one content");
    assert.strictEqual(
      result.contents!.length,
      1,
      "Single-document invoice analysis should produce exactly one content element",
    );

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

    // ========== Post-delete verification ==========
    // A subsequent GET on the deleted result should return HTTP 404. We tolerate a small
    // window where the result may still be reachable
    // immediately after deletion (the JS sample notes this) so we only assert 404 IF
    // an error is actually thrown.
    let deletedStatus: number | undefined;
    try {
      await client.getResultFile(operationId!, "result.json");
      console.log("Note: Result may still be accessible briefly after deletion");
    } catch (error) {
      const restError = error as { statusCode?: number; code?: string };
      deletedStatus = restError.statusCode;
      console.log(
        `Verified result was deleted (statusCode=${deletedStatus}, code=${restError.code})`,
      );
    }
    if (deletedStatus !== undefined) {
      assert.ok(
        deletedStatus === 404 || deletedStatus === 400,
        `Deleted-result GET should return HTTP 404 (or 400 in some deployments), but got ${deletedStatus}`,
      );
    }
  });
});
