// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to recognize identity documents from a file.
 */

import { FormRecognizerClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

import * as fs from "fs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const fileName = "./assets/license.jpg";

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expecting file ${fileName} exists`);
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
    throw new Error("Expecting at lease one identity document in the analysis result");
  }

  console.log("Identity Document Fields:");

  function printField(fieldName: string) {
    // Fields are extracted from the `fields` property of the document result
    const field = idDocument.fields[fieldName];
    console.log(
      `  ${fieldName} (${field.valueType}): '${field?.value ?? "<missing>"}', with confidence of ${
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
