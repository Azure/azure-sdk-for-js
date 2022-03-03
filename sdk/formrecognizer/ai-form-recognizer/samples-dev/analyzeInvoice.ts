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

import {
  AzureKeyCredential,
  DocumentAnalysisClient,
  PrebuiltModels,
} from "@azure/ai-form-recognizer";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");

  const client = new DocumentAnalysisClient(endpoint, credential);

  const poller = await client.beginAnalyzeDocument(
    PrebuiltModels.Invoice,
    // The form recognizer service will access the following URL to an invoice image and extract data from it
    "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/invoice/sample_invoice.jpg"
  );

  const {
    documents: [result],
  } = await poller.pollUntilDone();

  // Use of PrebuiltModels.Receipt above (rather than the raw model ID), adds strong typing of the model's output
  if (result) {
    const {
      vendorName,
      customerName,
      invoiceDate,
      dueDate,
      items,
      subTotal,
      previousUnpaidBalance,
      totalTax,
      amountDue,
    } = result.fields;

    // The invoice model has many fields, and we will only show some of them for the sake of the example
    console.log("Vendor Name:", vendorName && vendorName.value);
    console.log("Customer Name:", customerName && customerName.value);
    console.log("Invoice Date:", invoiceDate && invoiceDate.value);
    console.log("Due Date:", dueDate && dueDate.value);

    console.log("Items:");
    for (const item of (items && items.values) || []) {
      const { productCode, description, quantity, date, unit, unitPrice, tax, amount } =
        item.properties;

      console.log("-", (productCode && productCode.value) || "<no product code>");
      console.log("  Description:", description && description.value);
      console.log("  Quantity:", quantity && quantity.value);
      console.log("  Date:", date && date.value);
      console.log("  Unit:", unit && unit.value);
      console.log("  Unit Price:", unitPrice && unitPrice.value);
      console.log("  Tax:", tax && tax.value);
      console.log("  Amount:", amount && amount.value);
    }

    console.log("Subtotal:", subTotal && subTotal.value);
    console.log("Previous Unpaid Balance:", previousUnpaidBalance && previousUnpaidBalance.value);
    console.log("Tax:", totalTax && totalTax.value);
    console.log("Amount Due:", amountDue && amountDue.value);
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
