// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for classifyInPageSegments.ts - Classifier that splits multiple
 * distinct documents on the same page into separate `DocumentContent.segments`.
 *
 * Preview-only feature: the `allowInPageSegments` option and the resulting
 * `DocumentContent.segments` array only exist on the `2026-06-01-preview`
 * surface. The suite is marked `previewOnly` so `forEachServiceVersion` skips
 * the GA cell — mirrors preview-only service-version scoping.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import type {
  ContentAnalyzer,
  ContentUnderstandingClient,
  DocumentContent,
} from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  getSampleFilePath,
  testPollingOptions,
} from "./sampleTestUtils.js";
import { forEachServiceVersion, previewOnly } from "../../../utils/multiVersion.js";
import fs from "node:fs";

forEachServiceVersion(
  "Sample: classifyInPageSegments",
  previewOnly,
  ({ apiVersion, modelProfile }) => {
    let recorder: Recorder;
    let client: ContentUnderstandingClient;

    beforeEach(async (context) => {
      recorder = await createRecorder(context);
      client = createClient(recorder, apiVersion);
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("should split a mixed-document page into per-category segments", async () => {
      const filePath = getSampleFilePath("mixed_financial_docs_in_page.pdf");
      if (!fs.existsSync(filePath)) {
        console.warn(`Sample file not found at ${filePath}, skipping test`);
        return;
      }

      const analyzerId = recorder.variable(
        "inPageClassifierAnalyzerId",
        `in_page_classifier_${Math.floor(Date.now() / 1000)}`,
      );
      const analyzer: ContentAnalyzer = {
        baseAnalyzerId: "prebuilt-document",
        description: "Classify financial documents that may share a page.",
        config: {
          returnDetails: true,
          enableSegment: true,
          allowInPageSegments: true,
          estimateFieldSourceAndConfidence: true,
          contentCategories: {
            Invoice: {
              description:
                "An invoice requesting payment for goods or services, with line items, totals, and payment terms.",
            },
            BankStatement: {
              description:
                "A bank account statement listing balances, deposits, withdrawals, fees, and transactions.",
            },
          },
        },
        models: {
          completion:
            process.env["CONTENTUNDERSTANDING_COMPLETION_MODEL"] ?? modelProfile.completionModel,
        },
      } as unknown as ContentAnalyzer;

      try {
        const createPoller = client.createAnalyzer(analyzerId, analyzer, testPollingOptions);
        await createPoller.pollUntilDone();

        const bytes = fs.readFileSync(filePath);
        const analyzePoller = client.analyzeBinary(analyzerId, bytes, testPollingOptions);
        const result = await analyzePoller.pollUntilDone();

        const doc = result.contents.find((c) => c.kind === "document") as
          DocumentContent | undefined;
        assert.ok(doc, "Result should contain document content");

        // one-page PDF should produce exactly two segments — an Invoice in the upper
        // half and a BankStatement in the lower half — both covering page 1 only.
        assert.strictEqual(doc.startPageNumber, 1, "Document should start at page 1");
        assert.strictEqual(doc.endPageNumber, 1, "Document should end at page 1");

        const segments = doc.segments ?? [];
        assert.strictEqual(segments.length, 2, "Mixed-doc page should produce exactly 2 segments");

        const categories = segments.map((s) => s.category).sort();
        assert.deepStrictEqual(
          categories,
          ["BankStatement", "Invoice"],
          "Segment categories should be exactly Invoice and BankStatement",
        );

        for (const segment of segments) {
          assert.strictEqual(
            segment.startPageNumber,
            1,
            `Segment ${segment.category} should start at page 1`,
          );
          assert.strictEqual(
            segment.endPageNumber,
            1,
            `Segment ${segment.category} should end at page 1`,
          );
          assert.ok(
            segment.source && segment.source.trim().length > 0,
            `Segment ${segment.category} should have a non-empty source`,
          );
          assert.ok(
            segment.span && segment.span.length > 0,
            `Segment ${segment.category} span length should be > 0`,
          );
        }

        const distinctSources = new Set(segments.map((s) => s.source));
        if (isPlaybackMode()) {
          // The test-recorder sanitizer normalizes segment `source` values to
          // the literal string "Sanitized", so distinct-count collapses to 1
          // in playback. In live mode the service returns distinct source
          // anchors per segment; assert that only there.
          assert.ok(distinctSources.size >= 1, "Segments should carry a source");
        } else {
          assert.strictEqual(
            distinctSources.size,
            2,
            "The two segments should have distinct sources",
          );
        }

        const invoiceSegment = segments.find((s) => s.category === "Invoice")!;
        const bankStatementSegment = segments.find((s) => s.category === "BankStatement")!;

        // Exact span offsets/lengths recorded from the deterministic synthetic PDF.
        assert.strictEqual(invoiceSegment.span.offset, 0, "Invoice span offset should be 0");
        assert.strictEqual(invoiceSegment.span.length, 687, "Invoice span length should be 687");
        assert.strictEqual(
          bankStatementSegment.span.offset,
          687,
          "BankStatement span offset should be 687",
        );
        assert.strictEqual(
          bankStatementSegment.span.length,
          964,
          "BankStatement span length should be 964",
        );
        assert.strictEqual(
          invoiceSegment.span.offset + invoiceSegment.span.length,
          bankStatementSegment.span.offset,
          "Invoice span should end exactly where BankStatement span starts (adjacent, no gap)",
        );
        assert.strictEqual(
          bankStatementSegment.span.offset + bankStatementSegment.span.length,
          (doc.markdown ?? "").length,
          "Combined segment spans should cover the full document markdown",
        );

        const invoiceMarkdown = (doc.markdown ?? "").substring(
          invoiceSegment.span.offset,
          invoiceSegment.span.offset + invoiceSegment.span.length,
        );
        const bankStatementMarkdown = (doc.markdown ?? "").substring(
          bankStatementSegment.span.offset,
          bankStatementSegment.span.offset + bankStatementSegment.span.length,
        );
        assert.ok(
          invoiceMarkdown.includes("INVOICE"),
          "Invoice segment markdown should contain 'INVOICE'",
        );
        assert.ok(
          bankStatementMarkdown.includes("CONTOSO BANK"),
          "BankStatement segment markdown should contain 'CONTOSO BANK'",
        );
      } finally {
        await client.deleteAnalyzer(analyzerId);
      }
    });
  },
);
