// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for analyzeDiagnostics.ts - Read `AnalysisResult.infos`
 * (LLMStats etc.) from a preview analysis.
 *
 * Preview-only feature: `AnalysisResult.infos` only exists on the
 * `2026-06-01-preview` surface. Wrapped in
 * `forEachServiceVersion({ previewOnly: true })` so the GA cell is skipped.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  TEST_INVOICE_URL,
  testPollingOptions,
} from "./sampleTestUtils.js";
import { forEachServiceVersion, previewOnly } from "../../../utils/multiVersion.js";

forEachServiceVersion("Sample: analyzeDiagnostics", previewOnly, ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should surface AnalysisResult.infos after a prebuilt-invoice analysis", async () => {
    const poller = client.analyze(
      "prebuilt-invoice",
      [{ url: TEST_INVOICE_URL }],
      testPollingOptions,
    );
    const result = await poller.pollUntilDone();

    assert.ok(result, "Analysis result should not be null");
    assert.ok(
      result.contents && result.contents.length > 0,
      "Analysis contents should not be empty",
    );

    // analysis reliably surfaces at least one AnalysisResult.infos entry with code
    // "LLMStats" and a non-empty message; that is the primary contract this sample
    // demonstrates.
    const infos = result.infos ?? [];
    assert.ok(infos.length > 0, "AnalysisResult.infos should not be empty");
    const llmStatsInfos = infos.filter((info) => info.code === "LLMStats");
    assert.ok(
      llmStatsInfos.length > 0,
      `AnalysisResult.infos should include at least one entry with code 'LLMStats', got codes: ${infos.map((i) => i.code).join(", ")}`,
    );
    for (const info of llmStatsInfos) {
      assert.ok(
        info.message && info.message.trim().length > 0,
        "Each 'LLMStats' info entry should have a non-empty message",
      );
    }
    for (const info of infos) {
      assert.ok(info.code, "Each info entry should have a code");
      assert.ok(info.message, "Each info entry should have a message");
    }
  });
});
