// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for analyzeInvoice.ts - Analyze an invoice and extract structured fields.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type DocumentContent, type ArrayField, toLlmInput } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  TEST_INVOICE_URL,
} from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";

forEachServiceVersion("Sample: analyzeInvoice", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should analyze an invoice and extract structured fields", async () => {
    const poller = client.analyze(
      "prebuilt-invoice",
      [{ url: TEST_INVOICE_URL }],
      testPollingOptions,
    );

    const result = await poller.pollUntilDone();

    // Assertions: Verify result
    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");

    const content = result.contents[0];
    assert.ok(content, "Content should not be null");

    // ========== Invoice content verification ==========
    // region in . prebuilt-invoice on a PDF invoice always
    // produces document-kind content with application/pdf MIME type and a fields
    // dictionary. Per-field VALUE assertions are asset-specific and skipped here.
    assert.strictEqual(
      content.kind,
      "document",
      "prebuilt-invoice on a PDF should produce document-kind content",
    );
    assert.ok(content.markdown, "Invoice analysis should produce markdown content");
    assert.ok(content.markdown!.length > 0, "Markdown should not be empty");

    // Verify it's document content with fields
    if (content.kind === "document") {
      const documentContent = content as DocumentContent;

      // Structural document invariants (portable across environments).
      assert.strictEqual(
        documentContent.mimeType,
        "application/pdf",
        "MIME type should be application/pdf for a PDF invoice",
      );
      assert.ok(documentContent.fields, "Invoice document should have a fields dictionary");
      const fieldCount = Object.keys(documentContent.fields ?? {}).length;
      assert.ok(fieldCount > 0, "Invoice document should have at least one extracted field");
      console.log(`Total fields extracted: ${fieldCount}`);

      // prebuilt-invoice always returns these well-known invoice fields when applied
      // to an invoice PDF. This is portable because the FIELD KEYS are defined by the
      // prebuilt schema, independent of the specific invoice contents. (We don't
      // assert the field VALUES — those depend on which PDF was analyzed.)
      assert.ok(
        documentContent.fields!.CustomerName,
        "prebuilt-invoice should extract a CustomerName field",
      );
      assert.ok(
        documentContent.fields!.InvoiceDate,
        "prebuilt-invoice should extract an InvoiceDate field",
      );

      const customerNameField = documentContent.fields!.CustomerName;
      const invoiceDateField = documentContent.fields!.InvoiceDate;

      const customerName = customerNameField?.value;
      console.log(`Customer Name: ${customerName ?? "(not found)"}`);

      const invoiceDate = invoiceDateField?.value;
      console.log(`Invoice Date: ${invoiceDate ?? "(not found)"}`);

      // Check for line items
      const itemsField = documentContent.fields!.Items;
      if (itemsField && itemsField.type === "array") {
        const arrayField = itemsField as ArrayField;
        if (arrayField.value) {
          console.log(`Invoice contains ${arrayField.value.length} line item(s)`);
          assert.ok(arrayField.value.length >= 0, "Line items should be an array");
        }
      }

      // Verify page information
      console.log(`Document unit: ${documentContent.unit ?? "unknown"}`);
      console.log(`Pages: ${documentContent.startPageNumber} to ${documentContent.endPageNumber}`);
      assert.ok(documentContent.startPageNumber >= 1, "startPageNumber should be >= 1");
      assert.ok(
        documentContent.endPageNumber >= documentContent.startPageNumber,
        "endPageNumber should be >= startPageNumber",
      );
    }

    // Verify usage details from operationState (available after pollUntilDone completes)
    const usage = poller.operationState?.usage;
    assert.ok(usage, "operationState should have usage after completion");
    assert.isDefined(usage!.contextualizationTokens, "Should have contextualization tokens");
    assert.isDefined(usage!.tokens, "Should have tokens dictionary");
    console.log("\nUsage Details:");
    if (usage!.documentPagesStandard !== undefined) {
      console.log(`  Document pages (standard): ${usage!.documentPagesStandard}`);
    }
    console.log(`  Contextualization tokens: ${usage!.contextualizationTokens}`);
    if (usage!.tokens) {
      console.log("  Model tokens:");
      for (const [model, count] of Object.entries(usage!.tokens)) {
        console.log(`    ${model}: ${count}`);
      }
    }

    // Test toLlmInput conversion (mirrors sample's invoice_to_llm_input block).
    // Invoice analysis returns extracted fields which toLlmInput renders as YAML front matter
    // alongside the markdown body.
    const text = toLlmInput(result);
    assert.ok(
      typeof text === "string" && text.trim().length > 0,
      "toLlmInput should return a non-empty string",
    );
    assert.ok(
      text.startsWith("---"),
      "toLlmInput output should start with YAML front matter delimiter",
    );
    assert.ok(
      text.includes("\n---\n"),
      "toLlmInput output should contain YAML front matter closing delimiter",
    );
    assert.ok(
      text.includes("mimeType: application/pdf"),
      "YAML front matter should declare 'mimeType: application/pdf'",
    );
    assert.ok(
      text.includes("fields:"),
      "Invoice toLlmInput output should include a 'fields:' block",
    );
    console.log(
      `[PASS] toLlmInput output validated (${text.length} characters, includes invoice fields)`,
    );
  });
});
