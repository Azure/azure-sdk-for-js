// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Analyze an invoice from a URL using the prebuilt-invoice analyzer.
 *
 * This sample demonstrates how to analyze an invoice from a URL using the prebuilt-invoice
 * analyzer and extract structured fields from the result.
 *
 * Content Understanding provides 70+ production-ready prebuilt analyzers that are ready to use
 * without any training or configuration. The prebuilt-invoice analyzer automatically extracts:
 * - Customer/Vendor information: Name, address, contact details
 * - Invoice metadata: Invoice number, date, due date, purchase order number
 * - Line items: Description, quantity, unit price, total for each item
 * - Financial totals: Subtotal, tax amount, shipping charges, total amount
 * - Payment information: Payment terms, payment method, remittance address
 */

import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import {
  ContentUnderstandingClient,
  toLlmInput,
  type DocumentContent,
  type ArrayField,
  type ObjectField,
} from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Analyze Invoice Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  const invoiceUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/invoice.pdf";

  console.log("Analyzing invoice with prebuilt-invoice analyzer...");
  console.log(`  URL: ${invoiceUrl}`);

  const poller = client.analyze("prebuilt-invoice", [{ url: invoiceUrl }]);
  const result = await poller.pollUntilDone();

  if (!result.contents || result.contents.length === 0) {
    console.log("No content found in the analysis result.");
    return;
  }

  const content = result.contents[0];

  // Get the document content (invoices are documents)
  if (content.kind === "document") {
    const documentContent = content as DocumentContent;

    // Print document unit information
    console.log(`\nDocument unit: ${documentContent.unit ?? "unknown"}`);
    console.log(`Pages: ${documentContent.startPageNumber} to ${documentContent.endPageNumber}`);

    if (documentContent.pages && documentContent.pages.length > 0) {
      const page = documentContent.pages[0];
      const unit = documentContent.unit ?? "units";
      console.log(`Page dimensions: ${page.width} x ${page.height} ${unit}`);
    }
    console.log();

    if (!documentContent.fields) {
      console.log("No fields found in the analysis result.");
      return;
    }

    // Extract simple string fields
    const customerNameField = documentContent.fields["CustomerName"];
    const invoiceDateField = documentContent.fields["InvoiceDate"];

    const customerName = customerNameField?.value;
    const invoiceDate = invoiceDateField?.value;

    console.log(`Customer Name: ${customerName ?? "(None)"}`);
    if (customerNameField) {
      console.log(
        `  Confidence: ${customerNameField.confidence !== undefined ? customerNameField.confidence.toFixed(2) : "N/A"}`,
      );
      console.log(`  Source: ${customerNameField.source ?? "N/A"}`);
      if (customerNameField.spans && customerNameField.spans.length > 0) {
        const span = customerNameField.spans[0];
        console.log(`  Position in markdown: offset=${span.offset}, length=${span.length}`);
      }
    }

    console.log(`Invoice Date: ${invoiceDate ?? "(None)"}`);
    if (invoiceDateField) {
      console.log(
        `  Confidence: ${invoiceDateField.confidence !== undefined ? invoiceDateField.confidence.toFixed(2) : "N/A"}`,
      );
    }

    // Extract object field (TotalAmount contains Amount and CurrencyCode)
    const totalAmountField = documentContent.fields["TotalAmount"];
    if (totalAmountField && totalAmountField.type === "object") {
      const objField = totalAmountField as ObjectField;
      if (objField.value) {
        const amountField = objField.value["Amount"];
        const currencyField = objField.value["CurrencyCode"];

        const amount = amountField?.value;
        const currency = currencyField?.value;

        console.log(`\nTotal Amount: ${amount} ${currency}`);
        if (totalAmountField.confidence !== undefined) {
          console.log(`  Confidence: ${totalAmountField.confidence.toFixed(2)}`);
        }
      }
    }

    // Extract array field (LineItems - line items)
    const lineItemsField = documentContent.fields["LineItems"];
    if (lineItemsField && lineItemsField.type === "array") {
      const arrField = lineItemsField as ArrayField;
      if (arrField.value && arrField.value.length > 0) {
        console.log(`\nLine Items (${arrField.value.length}):`);
        arrField.value.forEach((item, index) => {
          if (item.type === "object") {
            const itemObj = item as ObjectField;
            if (itemObj.value) {
              const descriptionField = itemObj.value["Description"];
              const quantityField = itemObj.value["Quantity"];
              const unitPriceField = itemObj.value["UnitPrice"];
              const amountField = itemObj.value["Amount"];

              const description = descriptionField?.value ?? "(no description)";
              const quantity = quantityField?.value ?? "N/A";

              // Display price information - prefer UnitPrice if available, otherwise Amount
              let priceInfo = "";
              if (unitPriceField && unitPriceField.type === "object") {
                const unitPriceObj = unitPriceField as ObjectField;
                if (unitPriceObj.value) {
                  const unitPriceAmount = unitPriceObj.value["Amount"];
                  const unitPriceCurrency = unitPriceObj.value["CurrencyCode"];
                  if (unitPriceAmount) {
                    const amt = unitPriceAmount.value;
                    const curr = unitPriceCurrency?.value ?? "";
                    priceInfo = `Unit Price: ${amt} ${curr}`.trim();
                  }
                }
              } else if (amountField) {
                const amt = amountField.value;
                if (amt !== undefined) {
                  priceInfo = `Amount: ${amt}`;
                }
              }

              console.log(`  ${index + 1}. ${description}`);
              console.log(`     Quantity: ${quantity}${priceInfo ? `, ${priceInfo}` : ""}`);
            }
          }
        });
      }
    }
  }

  // Access usage details from the poller (available after pollUntilDone() completes).
  // Usage reports resource consumption for billing estimation:
  //
  // - documentPagesStandard/Basic/Minimal: Pages processed at each extraction tier.
  //   Standard = layout + OCR (scanned docs), Basic = OCR only, Minimal = digital formats
  //   (DOCX, XLSX, HTML, TXT) that need no OCR. Charged per 1,000 pages.
  //
  // - contextualizationTokens: Fixed-rate tokens charged by Content Understanding for
  //   preparing context, generating confidence scores, source grounding, and formatting
  //   output. Typically 1,000 tokens per page. Charged separately from LLM tokens.
  //
  // - tokens: Record of "{model}-input" / "{model}-output" token counts consumed by your
  //   Foundry model deployment (e.g. "gpt-4.1-input", "gpt-4.1-output"). These are
  //   billed on your Foundry deployment, not on Content Understanding.
  //
  // For full pricing details, see:
  // https://learn.microsoft.com/azure/ai-services/content-understanding/pricing-explainer
  const usage = poller.operationState?.usage;
  if (usage) {
    console.log("\nUsage Details:");
    if (usage.documentPagesStandard !== undefined) {
      console.log(`  Document pages (standard): ${usage.documentPagesStandard}`);
    }
    if (usage.contextualizationTokens !== undefined) {
      console.log(`  Contextualization tokens: ${usage.contextualizationTokens}`);
    }
    if (usage.tokens) {
      console.log("  Model tokens:");
      for (const [model, count] of Object.entries(usage.tokens)) {
        console.log(`    ${model}: ${count}`);
      }
    }
  }

  // ======================================================================
  // Convert the result to LLM-ready text using toLlmInput.
  // ======================================================================
  // The fields above can also be packaged into a single LLM-ready text block.
  // toLlmInput() renders all extracted fields as YAML front matter followed by
  // the markdown body, so an LLM can consume both structured data and document text
  // in one shot. For advanced options, see toLlmInput.ts.
  console.log("\nLLM-ready output:");
  console.log("=".repeat(50));
  console.log(toLlmInput(result));
  console.log("=".repeat(50));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
