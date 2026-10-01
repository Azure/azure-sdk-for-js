// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for extractDocumentMetadata.ts - Read `AnalysisContent.metadata`
 * (author, contentType, createdAt, etc.) surfaced by prebuilt-layout.
 *
 * Preview-only feature: `AnalysisContent.metadata` only exists on the
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

forEachServiceVersion("Sample: extractDocumentMetadata", previewOnly, ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should extract document-level metadata from a PDF via prebuilt-layout", async () => {
    const pdfPath = getSampleFilePath("sample_metadata.pdf");
    if (!fs.existsSync(pdfPath)) {
      console.warn(`Metadata sample PDF not found at ${pdfPath}, skipping test`);
      return;
    }

    const bytes = fs.readFileSync(pdfPath);
    const poller = client.analyzeBinary("prebuilt-layout", bytes, testPollingOptions);
    const result = await poller.pollUntilDone();

    assert.ok(result, "Analysis result should not be null");
    const doc = result.contents.find((c) => c.kind === "document") as DocumentContent | undefined;
    assert.ok(doc, "Result should contain document content");

    // assertions: sample_metadata.pdf has a deterministic set of embedded metadata
    // values (author, contentType, language, pageCount, title) authored by the
    // synthetic "Contoso Metadata Team" fixture.
    const metadata = doc.metadata ?? {};
    assert.strictEqual(
      metadata["author"],
      "Contoso Metadata Team",
      "author should be 'Contoso Metadata Team'",
    );
    assert.strictEqual(
      metadata["contentType"],
      "application/pdf",
      "contentType should be 'application/pdf'",
    );
    assert.strictEqual(metadata["language"], "en-US", "language should be 'en-US'");
    assert.strictEqual(metadata["pageCount"], "1", "pageCount should be '1'");
    assert.strictEqual(
      metadata["title"],
      "Contoso Metadata Extraction Sample",
      "title should be 'Contoso Metadata Extraction Sample'",
    );
  });

  it("should extract document-level metadata from a DOCX via prebuilt-layout", async () => {
    const docxPath = getSampleFilePath("sample_metadata.docx");
    if (!fs.existsSync(docxPath)) {
      console.warn(`Metadata sample DOCX not found at ${docxPath}, skipping test`);
      return;
    }

    const bytes = fs.readFileSync(docxPath);
    const poller = client.analyzeBinary("prebuilt-layout", bytes, testPollingOptions);
    const result = await poller.pollUntilDone();

    assert.ok(result, "Analysis result should not be null");
    const doc = result.contents.find((c) => c.kind === "document") as DocumentContent | undefined;
    assert.ok(doc, "Result should contain document content");

    // assertions: sample_metadata.docx exposes the base PDF-style keys plus DOCX-only
    // properties (characterCount, wordCount, createdAt, lastModifiedAt, lastModifiedBy).
    // The `lastModifiedBy` value is "Megan Bowen" in live mode and "Sanitized" in playback;
    // both are accepted via the fallback below so the recording sanitizer can rewrite
    // the identity without breaking the assertion.
    const metadata = doc.metadata ?? {};
    assert.strictEqual(
      metadata["author"],
      "Contoso Metadata Team",
      "author should be 'Contoso Metadata Team'",
    );
    assert.strictEqual(metadata["characterCount"], "207", "characterCount should be '207'");
    assert.strictEqual(
      metadata["contentType"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "contentType should be the openxml wordprocessingml MIME type",
    );
    assert.strictEqual(
      metadata["createdAt"],
      "2026-07-16T19:00:00Z",
      "createdAt should be '2026-07-16T19:00:00Z'",
    );
    assert.strictEqual(
      metadata["lastModifiedAt"],
      "2026-07-16T20:30:00Z",
      "lastModifiedAt should be '2026-07-16T20:30:00Z'",
    );
    assert.ok(
      metadata["lastModifiedBy"] === "Megan Bowen" || metadata["lastModifiedBy"] === "Sanitized",
      `lastModifiedBy should be 'Megan Bowen' (live) or 'Sanitized' (playback), got '${metadata["lastModifiedBy"]}'`,
    );
    assert.strictEqual(metadata["pageCount"], "1", "pageCount should be '1'");
    assert.strictEqual(
      metadata["title"],
      "Contoso Metadata Extraction Sample",
      "title should be 'Contoso Metadata Extraction Sample'",
    );
    assert.strictEqual(metadata["wordCount"], "29", "wordCount should be '29'");
  });
});
