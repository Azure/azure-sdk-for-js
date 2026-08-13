// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for detectSignatures.ts - Extract `DocumentSignature` items
 * from an image or PDF containing signatures.
 *
 * Preview-only feature: `DocumentContent.signatures` only exists on the
 * `2026-06-01-preview` surface. Wrapped in
 * `forEachServiceVersion({ previewOnly: true })` so the GA cell is skipped.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient, DocumentContent } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  getSampleFilePath,
  testPollingOptions,
} from "./sampleTestUtils.js";
import { forEachServiceVersion, previewOnly } from "../../../utils/multiVersion.js";
import fs from "node:fs";

forEachServiceVersion("Sample: detectSignatures", previewOnly, ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it(
    "should extract signatures from an image with prebuilt-layout",
    async () => {
    const filePath =
      process.env["CONTENTUNDERSTANDING_SIGNATURE_FILE"] || getSampleFilePath("sample_signature.png");
    if (!fs.existsSync(filePath)) {
      console.warn(`Signature sample file not found at ${filePath}, skipping test`);
      return;
    }

    const bytes = fs.readFileSync(filePath);

    const poller = client.analyzeBinary(
      "prebuilt-layout",
      bytes,
      testPollingOptions,
    );
    const result = await poller.pollUntilDone();

    assert.ok(result, "Analysis result should not be null");
    const doc = result.contents.find((c) => c.kind === "document") as DocumentContent | undefined;
    assert.ok(doc, "Result should contain document content");

    const signatures = doc.signatures ?? [];
    // training acknowledgment PNG contains at least two signatures (participant and
    // approver), each with a non-empty id and source.
    assert.ok(
      signatures.length >= 2,
      `Signature image should produce at least 2 signatures, got ${signatures.length}`,
    );
    for (const signature of signatures) {
      assert.ok(
        signature.id && signature.id.trim().length > 0,
        "Each signature should have a non-empty id",
      );
      assert.ok(
        signature.source && signature.source.trim().length > 0,
        "Each signature should have a non-empty source",
      );
    }
  });
});
