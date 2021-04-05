// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to recognize elements of an invoice from a file
 * using a prebuilt model.
 *
 * The prebuilt invoice model can return several fields. For a detailed list of
 * the fields supported by the invoice model, see the following link:
 *
 * https://aka.ms/formrecognizer/invoicefields
 *
 * @summary extract data from an image of an invoice
 */

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "<api key>";
  const fileName = "./assets/invoice/sample_invoice.jpg";

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expected file "${fileName}" to exist.`);
  }

  const readStream = fs.createReadStream(fileName);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeInvoices(readStream, {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  const [invoice] = await poller.pollUntilDone();

  if (invoice === undefined) {
    throw new Error("Failed to extract data from at least one invoice.");
  }

  /**
   * This is a helper function for printing a simple field with an elemental type.
   */
  function fieldToString(field) {
    const { name, valueType, value, confidence } = field;
    return `${name} (${valueType}): '${value}' with confidence ${confidence}'`;
  }

  console.log("Invoice fields:");

  /**
   * Invoices contain a lot of optional fields, but they are all of elemental types
   * such as strings, numbers, and dates, so we will just enumerate them all.
   */
  for (const [name, field] of Object.entries(invoice.fields)) {
    if (field.valueType !== "array" && field.valueType !== "object") {
      console.log(`- ${name} ${fieldToString(field)}`);
    }
  }

  // Invoices also support nested line items, so we can iterate over them.
  let idx = 0;

  console.log("- Items:");

  const items = invoice.fields["Items"]?.value;
  for (const item of items ?? []) {
    const value = item.value;

    // Each item has several subfields that are nested within the item. We'll
    // map over this list of the subfields and filter out any fields that
    // weren't found. Not all fields will be returned every time, only those
    // that the service identified for the particular document in question.

    const subFields = [
      "Description",
      "Quantity",
      "Unit",
      "UnitPrice",
      "ProductCode",
      "Date",
      "Tax",
      "Amount"
    ]
      .map((fieldName) => value[fieldName])
      .filter((field) => field !== undefined);

    console.log(
      [
        `  - Item #${idx}`,
        // Now we will convert those fields into strings to display
        ...subFields.map((field) => `    - ${fieldToString(field)}`)
      ].join("\n")
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
