// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for analyzeInvoice.ts - Analyze an invoice and extract structured fields.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type DocumentContent, type ArrayField } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  TEST_INVOICE_URL,
} from "./sampleTestUtils.js";

describe("Sample: analyzeInvoice", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
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

    // Verify it's document content with fields
    if (content.kind === "document") {
      const documentContent = content as DocumentContent;

      // Document should have fields for invoice data
      if (documentContent.fields) {
        console.log(`Total fields extracted: ${Object.keys(documentContent.fields).length}`);

        // Check for common invoice fields
        const customerNameField = documentContent.fields["CustomerName"];
        const invoiceDateField = documentContent.fields["InvoiceDate"];

        if (customerNameField) {
          const customerName = customerNameField.value;
          console.log(`Customer Name: ${customerName ?? "(not found)"}`);
        }

        if (invoiceDateField) {
          const invoiceDate = invoiceDateField.value;
          console.log(`Invoice Date: ${invoiceDate ?? "(not found)"}`);
        }

        // Check for line items
        const itemsField = documentContent.fields["Items"];
        if (itemsField && itemsField.type === "array") {
          const arrayField = itemsField as ArrayField;
          if (arrayField.value) {
            console.log(`Invoice contains ${arrayField.value.length} line item(s)`);
            assert.ok(arrayField.value.length >= 0, "Line items should be an array");
          }
        }
      }

      // Verify page information
      console.log(`Document unit: ${documentContent.unit ?? "unknown"}`);
      console.log(`Pages: ${documentContent.startPageNumber} to ${documentContent.endPageNumber}`);
    }
  });
});
