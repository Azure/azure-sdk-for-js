// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to recognize elements of a identity document
 * from a file using a prebuilt model.
 *
 * The prebuilt identity document model can return several fields. For a
 * detailed list of the fields supported by the identity document model, see
 * the following link:
 *
 * https://aka.ms/azsdk/formrecognizer/iddocumentfields
 *
 * @summary extract data from an image of a identity document
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

  const fileName = "./assets/idDocument/license.jpg";

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expected file "${fileName}" to exist.`);
  }

  const readStream = fs.createReadStream(fileName);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeIdDocuments(readStream, {
    contentType: "image/jpeg",
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  const [idDocument] = await poller.pollUntilDone();

  if (idDocument === undefined) {
    throw new Error("Failed to extract data from at least one identity document.");
  }

  // Identity documents have multiple different document types, such as:
  // - driver licenses
  // - passports
  console.log("Document Type:", idDocument.formType);

  console.log("Identity Document Fields:");

  function printField(fieldName) {
    // Fields are extracted from the `fields` property of the document result
    const field = idDocument.fields[fieldName];
    console.log(
      `- ${fieldName} (${field?.valueType}): '${field?.value ?? "<missing>"}', with confidence ${
        field?.confidence
      }`
    );
  }

  // For a list of fields that are contained in the response, please refer to
  // the "Supported fields" section at the following link:
  // https://aka.ms/azsdk/formrecognizer/iddocumentfields

  printField("FirstName");
  printField("LastName");
  printField("DocumentNumber");
  printField("DateOfBirth");
  printField("DateOfExpiration");
  printField("Sex");
  printField("Address");
  printField("Country");
  printField("Region");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
