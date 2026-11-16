// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for analyzeBinaryInline.ts - Analyze a local PDF via the inline
 * (non-LRO, HTTP 200) preview endpoint.
 *
 * Preview-only feature: `analyzeBinaryInline` only exists on the
 * `2026-06-01-preview` surface. Wrapped in
 * `forEachServiceVersion({ previewOnly: true })` so the GA cell is skipped.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient, DocumentContent } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient, getSampleFilePath } from "./sampleTestUtils.js";
import { forEachServiceVersion, previewOnly } from "../../../utils/multiVersion.js";
import fs from "node:fs";

forEachServiceVersion("Sample: analyzeBinaryInline", previewOnly, ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should analyze a PDF inline with prebuilt-layout", async () => {
    const filePath = getSampleFilePath("sample_invoice.pdf");
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }

    const pdfBytes = fs.readFileSync(filePath);
    assert.ok(pdfBytes.length > 0, "PDF bytes should not be empty");

    const result = await client.analyzeBinaryInline("prebuilt-layout", pdfBytes, {
      contentRange: "1-",
    });

    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");

    // ========== Inline binary analysis verification ==========
    // .
    const content = result.contents[0];
    assert.strictEqual(
      content.kind,
      "document",
      "prebuilt-layout on a PDF should produce document-kind content",
    );
    if (content.kind === "document") {
      const doc = content as DocumentContent;
      assert.ok(doc.markdown, "Document should have markdown content");
      assert.ok(doc.markdown!.length > 0, "Inline binary markdown should not be empty");
      assert.ok(doc.startPageNumber >= 1, "Start page should be >= 1");
    }

    // Usage metering assertions verify inline analysis bills the inline-specific meter.
    // Inline analysis bills documentPagesStandardInline, not the LRO meter.
    const usage = result.usage;
    assert.ok(usage, "Inline binary analysis should include usage details");
    assert.ok(
      usage.documentPagesStandardInline !== undefined && usage.documentPagesStandardInline !== null,
      "prebuilt-layout inline should bill documentPagesStandardInline",
    );
    assert.ok(
      (usage.documentPagesStandardInline ?? 0) > 0,
      "documentPagesStandardInline meter should be positive",
    );
    // LRO meter should not be set for inline results.
    assert.ok(
      usage.documentPagesStandard === undefined || usage.documentPagesStandard === null,
      "LRO documentPagesStandard should not be set for inline analyze",
    );
  });

  // ContentRange in the options bag when the selected content fits within its 5-page limit.
  it("should honor contentRange in inline analysis when within the 5-page limit", async () => {
    const filePath = getSampleFilePath("sample_invoice.pdf");
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }

    const pdfBytes = fs.readFileSync(filePath);
    const result = await client.analyzeBinaryInline("prebuilt-layout", pdfBytes, {
      contentRange: "1-5",
    });

    assert.ok(result, "Inline analysis result should not be null");
    assert.ok(result.contents?.length, "Result should have at least one content");
    const content = result.contents[0];
    if (content.kind === "document") {
      const doc = content as DocumentContent;
      assert.ok(doc.startPageNumber >= 1, "Start page should be >= 1");
      assert.ok(doc.endPageNumber >= doc.startPageNumber, "End page should be at least start page");
    }
  });

  // 5-page input limit. A ContentRange that selects more than 5 pages must be rejected
  // with HTTP 400 InvalidRequest, even when AllowInputTruncation is true.
  //
  // The CU service response body contains a nested detail
  // (`error.innererror.code = "InputPageCountExceeded"` with a message explaining the
  // page-count limit). Today the JS core's `createRestError` (in
  // `@typespec/ts-http-runtime`) does not carry the parsed body over to the emitted
  // `RestError` — it only sets `bodyAsText` when the incoming body is a string, and by
  // deserialize-time the body has already been parsed. As a result JS customers cannot
  // programmatically distinguish `InputPageCountExceeded` from other `InvalidRequest`
  // failures.Message` includes the full
  // serialized body. The assertions below only check what the JS SDK actually surfaces.
  it("should reject inline analysis when contentRange exceeds the 5-page limit", async () => {
    const filePath = getSampleFilePath("mixed_financial_invoices.pdf");
    if (!fs.existsSync(filePath)) {
      console.warn(`Multi-page sample not found at ${filePath}, skipping test`);
      return;
    }

    const pdfBytes = fs.readFileSync(filePath);
    let caughtStatus: number | undefined;
    let caughtCode: string | undefined;
    try {
      await client.analyzeBinaryInline("prebuilt-layout", pdfBytes, {
        contentRange: "3-",
        allowInputTruncation: true,
      });
      assert.fail("Inline analysis should have rejected an over-limit ContentRange");
    } catch (err: unknown) {
      const restError = err as { statusCode?: number; code?: string };
      caughtStatus = restError.statusCode;
      caughtCode = restError.code;
    }

    assert.equal(caughtStatus, 400, "Over-limit inline analysis should return HTTP 400");
    assert.equal(
      caughtCode,
      "InvalidRequest",
      "Over-limit inline analysis should use error code InvalidRequest",
    );
  });
});
