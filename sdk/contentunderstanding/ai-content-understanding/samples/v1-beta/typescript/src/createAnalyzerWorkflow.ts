// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Compare `default` and `agentic` analyzer workflows on the same input.
 *
 * This sample creates two custom analyzers that share the same field schema and only
 * differ in `ContentAnalyzerConfig.workflow`:
 *
 * - `default` workflow: standard extraction. Well suited to reading values printed
 *   directly on the document.
 * - `agentic` workflow: iterative reasoning with tool calling. Use it when an answer must
 *   be **built from evidence** across the document — for example multistep reasoning,
 *   calculations, validation, or analysis of complex tables and figures.
 *
 * Both analyzers are asked to extract:
 * - `InvoiceId` — a direct field printed on the invoice, which both workflows can extract.
 * - `AverageItemPrice` — a derived field: the arithmetic mean of the `UNIT PRICE` column.
 *   This benefits from agentic reasoning because it requires collecting many unit prices
 *   and calculating their mean.
 *
 * The sample uses `workflow_invoice_20_items.pdf`, a 20-item invoice with a UNIT PRICE
 * column where the arithmetic mean of unit prices is 20.5 (invoice id INV-2048). The
 * default workflow reliably extracts the direct `InvoiceId`; the agentic workflow reliably
 * computes the correct `AverageItemPrice` while the default workflow may approximate it or
 * vary between runs. Provide your own invoice PDF via `CONTENTUNDERSTANDING_INVOICE_FILE`
 * to compare workflows on a different document.
 *
 * ## Preview notes
 *
 * In `2026-06-01-preview`, analysis currently supports **one input file per request**
 * regardless of workflow. Agentic mode uses the **advanced contextualization** rate and
 * typically takes longer and consumes more model tokens than the default workflow.
 *
 * ## Prerequisites
 *
 * You need a Microsoft Foundry resource with a completion model deployment. Configure
 * defaults via `updateDefaults.ts`, or set `analyzer.models["completion"]` explicitly as
 * shown below.
 *
 * This sample requires service API version `2026-06-01-preview`.
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import type {
  ContentAnalyzer,
  ContentAnalyzerWorkflow,
  ContentFieldSchema,
  DocumentContent,
  NumberField,
  StringField,
} from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

// Shared field schema so `workflow` is the only variable between the two analyzers.
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

async function createWorkflowAnalyzer(
  client: ContentUnderstandingClient,
  analyzerId: string,
  workflow: ContentAnalyzerWorkflow | undefined,
  completionModel: string,
): Promise<void> {
  const analyzer: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-document",
    description: `Analyzer using ${workflow ?? "default"} workflow`,
    fieldSchema,
    config: {
      returnDetails: true,
      // Omit `workflow` for standard extraction (equivalent to `"default"`).
      // Set `"agentic"` explicitly when an answer must be built from evidence.
      ...(workflow ? { workflow } : {}),
    },
    models: {
      completion: completionModel,
    },
  } as unknown as ContentAnalyzer;
  const poller = client.createAnalyzer(analyzerId, analyzer);
  await poller.pollUntilDone();
}

async function analyzeWithAnalyzer(
  client: ContentUnderstandingClient,
  analyzerId: string,
  bytes: Uint8Array,
): Promise<{ invoiceId: string | undefined; averageItemPrice: number | undefined }> {
  const poller = client.analyzeBinary(analyzerId, bytes);
  const result = await poller.pollUntilDone();
  const doc = result.contents.find((c) => c.kind === "document") as DocumentContent | undefined;
  const fields = doc?.fields ?? {};
  return {
    invoiceId: (fields["InvoiceId"] as StringField | undefined)?.value,
    averageItemPrice: (fields["AverageItemPrice"] as NumberField | undefined)?.value,
  };
}

export async function main(): Promise<void> {
  console.log("== Create Analyzer Workflow Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const invoicePath =
    process.env["CONTENTUNDERSTANDING_INVOICE_FILE"] ??
    path.join("..", "..", "assets", "workflow_invoice_20_items.pdf");

  const client = new ContentUnderstandingClient(endpoint, getCredential());
  const completionModel = process.env["CONTENTUNDERSTANDING_COMPLETION_MODEL"] ?? "gpt-5.2";
  const timestamp = Math.floor(Date.now() / 1000);
  const defaultAnalyzerId = `invoice_default_${timestamp}`;
  const agenticAnalyzerId = `invoice_agentic_${timestamp}`;

  try {
    console.log(`Creating '${defaultAnalyzerId}' (default workflow)...`);
    // Omit `workflow` for standard extraction.
    await createWorkflowAnalyzer(client, defaultAnalyzerId, undefined, completionModel);
    console.log(`Creating '${agenticAnalyzerId}' (agentic workflow)...`);
    await createWorkflowAnalyzer(client, agenticAnalyzerId, "agentic", completionModel);

    const bytes = fs.readFileSync(invoicePath);
    console.log(`\nAnalyzing ${invoicePath} with both workflows...`);

    const [defaultResult, agenticResult] = await Promise.all([
      analyzeWithAnalyzer(client, defaultAnalyzerId, bytes),
      analyzeWithAnalyzer(client, agenticAnalyzerId, bytes),
    ]);

    console.log("\nResults:");
    console.log(
      `  Default workflow: InvoiceId=${defaultResult.invoiceId ?? "(not extracted)"}, AverageItemPrice=${defaultResult.averageItemPrice ?? "(not extracted)"}`,
    );
    console.log(
      `  Agentic workflow: InvoiceId=${agenticResult.invoiceId ?? "(not extracted)"}, AverageItemPrice=${agenticResult.averageItemPrice ?? "(not extracted)"}`,
    );
    console.log(
      "\nBoth workflows should extract the direct InvoiceId. The default workflow may approximate the derived average " +
        "or vary between runs; the agentic workflow uses reasoning + tool calls to compute a precise mean.",
    );
  } finally {
    console.log(`\nCleaning up analyzers...`);
    await Promise.allSettled([
      client.deleteAnalyzer(defaultAnalyzerId),
      client.deleteAnalyzer(agenticAnalyzerId),
    ]);
    console.log("Cleanup complete.");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
