// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze a form from a document with a custom
 * model trained using labels. The form must be of the same type as the forms the custom model
 * was trained on. To learn how to train your own models, see the samples in
 * trainModel.js or trainModelWithLabels.js
 */

const { FormRecognizerClient, AzureKeyCredential } = require("../../dist");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = process.env["LABELED_CUSTOM_MODEL_ID"] || "<labeled custom model id>";
  // The form you are recognizing must be of the same type as the forms the custom model was trained on
  const path = "./assets/Invoice_6.pdf";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeForms(modelId, readStream, "application/pdf", {
    // includeTextDetails: true,
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  console.log("Forms:")
  for (const form of response.forms || []) {
    console.log(`${form.formType}, page range: ${form.pageRange}`);
    console.log("Fields:");
    for (const fieldName in form.fields) {
      // each field is of type FormField
      const field = form.fields[fieldName];
      console.log(`Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`)
    }
  }

  console.log("Errors:");
  console.log(response.errors);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
