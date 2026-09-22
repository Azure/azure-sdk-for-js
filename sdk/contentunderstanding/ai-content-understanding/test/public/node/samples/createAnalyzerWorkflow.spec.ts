// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for createAnalyzerWorkflow.ts - Compare `default` and `agentic`
 * `ContentAnalyzerWorkflow` values on the same invoice.
 *
 * Preview-only feature: `ContentAnalyzerConfig.workflow` /
 * `ContentAnalyzerWorkflow` only exist on the `2026-06-01-preview` surface.
 * Wrapped in `forEachServiceVersion({ previewOnly: true })` so the GA cell is
 * skipped —
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  ContentAnalyzer,
  ContentAnalyzerWorkflow,
  ContentFieldSchema,
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
  "Sample: createAnalyzerWorkflow",
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

    it("should create analyzers with default and agentic workflows and analyze an invoice", async () => {
      const invoicePath =
        process.env["CONTENTUNDERSTANDING_INVOICE_FILE"] ||
        getSampleFilePath("workflow_invoice_20_items.pdf");
      if (!fs.existsSync(invoicePath)) {
        console.warn(`Workflow invoice sample not found at ${invoicePath}, skipping test`);
        return;
      }

      const completionModel =
        process.env["CONTENTUNDERSTANDING_COMPLETION_MODEL"] ?? modelProfile.completionModel;
      const timestamp = Math.floor(Date.now() / 1000);
      const defaultAnalyzerId = recorder.variable(
        "workflowDefaultAnalyzerId",
        `invoice_default_${timestamp}`,
      );
      const agenticAnalyzerId = recorder.variable(
        "workflowAgenticAnalyzerId",
        `invoice_agentic_${timestamp}`,
      );

      const fieldSchema: ContentFieldSchema = {
        name: "invoice_workflow_comparison",
        description: "Invoice fields used to compare default and agentic workflows",
        fields: {
          InvoiceId: {
            type: "string",
            description:
              "Invoice identifier printed on the invoice. Return only the identifier value without its label.",
          },
          AverageItemPrice: {
            type: "number",
            method: "generate",
            description:
              "Calculate the arithmetic mean of all values in the UNIT PRICE column. " +
              "Use only unit prices, not quantities, line amounts, subtotals, taxes, or totals.",
          },
        },
      };

      const buildAnalyzer = (workflow: ContentAnalyzerWorkflow): ContentAnalyzer =>
        ({
          baseAnalyzerId: "prebuilt-document",
          description: `Analyzer using ${workflow} workflow`,
          fieldSchema,
          config: { returnDetails: true, workflow },
          models: { completion: completionModel },
        }) as unknown as ContentAnalyzer;

      try {
        await client
          .createAnalyzer(defaultAnalyzerId, buildAnalyzer("default"), testPollingOptions)
          .pollUntilDone();
        await client
          .createAnalyzer(agenticAnalyzerId, buildAnalyzer("agentic"), testPollingOptions)
          .pollUntilDone();

        // GET each analyzer to inspect the resolved `config.workflow` value.
        // create LRO to read back the resolved workflow — the service normalizes
        // "default" and "agentic" into concrete workflow strings.
        const defaultAnalyzer = await client.getAnalyzer(defaultAnalyzerId);
        const agenticAnalyzer = await client.getAnalyzer(agenticAnalyzerId);

        // Workflow-resolution assertions: verify each
        // analyzer's resolved workflow — this is the semantic invariant that proves
        // the two workflows differ, not just the extracted values below.
        assert.ok(defaultAnalyzer.config, "Default analyzer config should not be null");
        assert.ok(agenticAnalyzer.config, "Agentic analyzer config should not be null");
        const defaultWorkflow = defaultAnalyzer.config?.workflow;
        const agenticWorkflow = agenticAnalyzer.config?.workflow;
        assert.ok(
          typeof defaultWorkflow === "string" && defaultWorkflow.length > 0,
          "Default analyzer should have a resolved workflow",
        );
        assert.ok(
          !defaultWorkflow!.toLowerCase().startsWith("agentic"),
          `Omitting workflow should resolve to a non-agentic workflow (got '${defaultWorkflow}')`,
        );
        assert.ok(
          typeof agenticWorkflow === "string" &&
            agenticWorkflow.toLowerCase().startsWith("agentic"),
          `Agentic analyzer should resolve to an agentic workflow (got '${agenticWorkflow}')`,
        );

        const bytes = fs.readFileSync(invoicePath);
        const [defaultResult, agenticResult] = await Promise.all([
          client.analyzeBinary(defaultAnalyzerId, bytes, testPollingOptions).pollUntilDone(),
          client.analyzeBinary(agenticAnalyzerId, bytes, testPollingOptions).pollUntilDone(),
        ]);

        const defaultDoc = defaultResult.contents.find((c) => c.kind === "document") as
          DocumentContent | undefined;
        const agenticDoc = agenticResult.contents.find((c) => c.kind === "document") as
          DocumentContent | undefined;

        assert.ok(defaultDoc, "Default workflow result should contain document content");
        assert.ok(agenticDoc, "Agentic workflow result should contain document content");
        assert.ok(defaultDoc.fields, "Default workflow document should expose a fields dictionary");
        assert.ok(agenticDoc.fields, "Agentic workflow document should expose a fields dictionary");

        // 20-item invoice has InvoiceId "INV-2048" and a UNIT PRICE mean of 20.5.
        // Both workflows reliably extract the direct InvoiceId. The default workflow may
        // approximate the derived average; the agentic workflow reliably computes 20.5.
        const defaultInvoiceId = (defaultDoc.fields["InvoiceId"] as { value?: string } | undefined)
          ?.value;
        const agenticInvoiceId = (agenticDoc.fields["InvoiceId"] as { value?: string } | undefined)
          ?.value;
        const agenticAveragePrice = (
          agenticDoc.fields["AverageItemPrice"] as { value?: number } | undefined
        )?.value;

        assert.strictEqual(
          defaultInvoiceId,
          "INV-2048",
          "Default workflow should extract InvoiceId 'INV-2048'",
        );
        assert.strictEqual(
          agenticInvoiceId,
          "INV-2048",
          "Agentic workflow should extract InvoiceId 'INV-2048'",
        );
        assert.ok(
          typeof agenticAveragePrice === "number",
          "Agentic workflow should return AverageItemPrice as a number",
        );
        const expectedAveragePrice = 20.5;
        assert.ok(
          Math.abs(agenticAveragePrice! - expectedAveragePrice) < 0.01,
          `Agentic workflow should compute AverageItemPrice within 0.01 of ${expectedAveragePrice}, got ${agenticAveragePrice}`,
        );
      } finally {
        await Promise.allSettled([
          client.deleteAnalyzer(defaultAnalyzerId),
          client.deleteAnalyzer(agenticAnalyzerId),
        ]);
      }
    });
  },
);
