// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates the differences in form recognition using custom
 * models trained with labels and custom models trained without labels.
 */

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const labeledModelId = process.env["LABELED_CUSTOM_MODEL_ID"] || "<model id from training with labels>";
  const unlabeledModelId = process.env["UNLABELED_CUSTOM_MODEL_ID"] || "<model id from training without labels>";
  // The form you are recognizing must be of the same type as the forms the custom model was trained on
  const path = "./assets/Invoice_6.pdf";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const formsWithLabels = await recognizeCustomForm(path, endpoint, apiKey, labeledModelId);
  const forms = await recognizeCustomForm(path, endpoint, apiKey, unlabeledModelId);

  // The main difference is found in the labels of its fields
  // The form recognized with a model from training with labels will have the labels it was trained with,
  // The form recognized with a model from training without labels will be denoted with indices
  console.log("# Recognized fields using labeled custom model");
  for (const form of formsWithLabels || []) {
    for (const fieldName in form.fields) {
      // With your labeled custom model, you will not get back label data but will get back value data
      // This is because your custom model didn't have to use any machine learning to deduce the label,
      // the label was directly provided to it
      const field = form.fields[fieldName];
      console.log(
        `\tField ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`
      );
    }
  }

  console.log("# Recognized fields using unlabeled custom model");
  for (const form of forms || []) {
    for (const fieldName in form.fields) {
      // The recognized form fields with a custom model from training without labels will also include data about recognized labels.
      const field = form.fields[fieldName];
      console.log(
        `\tField ${fieldName} has label '${field.labelData.text}' with a confidence score of ${field.confidence}`
      );
      console.log(
        `\tField ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`
      );
    }
  }
}

async function recognizeCustomForm(path, endpoint, apiKey, labeledModelId) {
  console.log("# Recognizing...");
  const readStream = fs.createReadStream(path);
  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeCustomForms(labeledModelId, readStream, "application/pdf", {
    onProgress: (state) => {
      console.log(`\tstatus: ${state.status}`);
    }
  });
  const forms = await poller.pollUntilDone();
  if (!forms || forms.length <= 0) {
    throw new Error("Expecting valid response!");
  }
  return forms;
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
