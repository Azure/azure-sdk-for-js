// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze a form from a document with an unlabeled
 * custom model. The form must be of the same type as the forms the custom model
 * was trained on. To learn how to train your own models, see the samples in
 * trainUnlabeledModel.ts or trainLabeledModel.ts
 */

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");
const path = require("path");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const modelId = process.env["UNLABELED_CUSTOM_MODEL_ID"] || "<unlabeled custom model id>";
  // The form you are recognizing must be of the same type as the forms the custom model was trained on
  const fileName = path.join(__dirname, "./assets/Form_1.jpg");

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expecting file ${fileName} exists`);
  }

  const readStream = fs.createReadStream(fileName);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeCustomForms(modelId, readStream, {
    contentType: "image/jpeg",
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });
  const forms = await poller.pollUntilDone();

  console.log("Forms:");
  for (const form of forms || []) {
    console.log(`${form.formType}, page range: ${form.pageRange}`);
    console.log("Pages:");
    for (const page of form.pages || []) {
      console.log(`Page number: ${page.pageNumber}`);
      console.log("Tables");
      for (const table of page.tables || []) {
        for (const cell of table.cells) {
          console.log(`cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
        }
      }
    }

    console.log("Fields:");
    for (const [fieldName, field] of Object.entries(form.fields)) {
      // each field is of type FormField
      console.log(
        `Field '${fieldName}' has value '${field.value}' with a confidence score of ${field.confidence}`
      );
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
