// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Recognize Labeled Form from url
 */

//import { FormRecognizerClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
import { FormRecognizerClient, AzureKeyCredential } from "../../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";

  const modelId = "db642b84-ce7a-4ec2-873d-9c4b5ab0160d"; // trained with labels
  const url = process.env["URL_OF_DOCUMENT_TO_ANALYZE_WITH_LABELS"] || "<sample invoice url>";

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeFormsFromUrl(modelId, url, {
    // includeTextDetails: true,
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  console.log("Form results:")
  for (const document of response.forms || []) {
    console.log(`${document.formType}, page range: ${document.pageRange}`);
    console.log("Fields:");
    for (const fieldName in document.fields) {
      // each field is of type FormField
      const field = document.fields[fieldName];
      console.log(`Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`)
    }
  }

  console.log("Errors:");
  console.log(response.errors);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
