// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to extract elements of an invoice from a URL to a file using the prebuilt invoice model.
 *
 * The prebuilt invoice model can return several fields. For a detailed list of the fields supported by the invoice
 * model, see the `Invoice` type in the documentation, or refer to the following link:
 *
 * https://aka.ms/azsdk/formrecognizer/invoicefieldschema
 *
 * @summary extract data from an invoice document
 */

const {
  AzureKeyCredential,
  DocumentAnalysisClient,
  PrebuiltModels
} = require("@azure/ai-form-recognizer");

const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT ?? "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY ?? "<api key>");

  const client = new DocumentAnalysisClient(endpoint, credential);

  const poller = await client.beginAnalyzeDocuments(
    PrebuiltModels.Invoice,
    // The form recognizer service will access the following URL to an invoice image and extract data from it
    "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/invoice/sample_invoice.jpg"
  );

  const {
    documents: [result]
  } = await poller.pollUntilDone();

  // Use of PrebuiltModels.Receipt above (rather than the raw model ID), adds strong typing of the model's output
  if (result) {
    const invoice = result.fields;

    // The invoice model has many fields, and we will only show some of them for the sake of the example
    console.log("Vendor Name:", invoice.vendorName?.value);
    console.log("Customer Name:", invoice.customerName?.value);
    console.log("Invoice Date:", invoice.invoiceDate?.value);
    console.log("Due Date:", invoice.dueDate?.value);

    console.log("Items:");
    for (const { properties: item } of invoice.items?.values ?? []) {
      console.log("-", item.productCode?.value ?? "<no product code>");
      console.log("  Description:", item.description?.value);
      console.log("  Quantity:", item.quantity?.value);
      console.log("  Date:", item.date?.value);
      console.log("  Unit:", item.unit?.value);
      console.log("  Unit Price:", item.unitPrice?.value);
      console.log("  Tax:", item.tax?.value);
      console.log("  Amount:", item.amount?.value);
    }

    console.log("Subtotal:", invoice.subTotal?.value);
    console.log("Previous Unpaid Balance:", invoice.previousUnpaidBalance?.value);
    console.log("Tax:", invoice.totalTax?.value);
    console.log("Amount Due:", invoice.amountDue?.value);
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
