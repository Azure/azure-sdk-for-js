// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates the differences in form recognition using custom
 * models trained with labeled and unlabeled data. It outputs the results of
 * recognition using the same form as input, and you can compare the output
 * from both systems.
 *
 * @summary see the differences in custom model recognition using labeled and
 * unlabeled training documents
 * @azsdk-weight 70
 */

import {
  FormRecognizerClient,
  AzureKeyCredential,
  RecognizedForm
} from "@azure/ai-form-recognizer";

import * as fs from "fs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "<api key>";
  const labeledModelId = process.env["LABELED_CUSTOM_MODEL_ID"] ?? "<labeled custom model id>";
  const unlabeledModelId =
    process.env["UNLABELED_CUSTOM_MODEL_ID"] ?? "<unlabeled custom model id>";

  // The form you are recognizing must be of the same type as the forms the custom model was trained on.
  const fileName = "./assets/forms/Form_1.jpg";

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expected file "${fileName}" to exist.`);
  }

  const formsWithLabels = await recognizeCustomForm(fileName, endpoint, apiKey, labeledModelId);
  const forms = await recognizeCustomForm(fileName, endpoint, apiKey, unlabeledModelId);

  // The main difference is found in the labels of its fields
  // The form recognized with a labeled model will have the labels it was trained with,
  // the unlabeled one will be denoted with indices.
  console.log("Recognized fields using labeled custom model:");
  for (const form of formsWithLabels ?? []) {
    for (const [fieldName, field] of Object.entries(form.fields)) {
      // With your labeled custom model, you will not get back label data but will get back value data
      // This is because your custom model didn't have to use any machine learning to deduce the label;
      // the label was directly provided to it.
      console.log(
        `- ${fieldName} (${field.valueType}): '${field.value ?? "<missing>"}' with confidence ${
          field.confidence
        }`
      );
    }
  }

  console.log("Recognized fields using unlabeled custom model:");
  for (const form of forms ?? []) {
    for (const [fieldName, field] of Object.entries(form.fields)) {
      console.log(
        `- ${fieldName} (${field.valueType}): '${field.value ?? "<missing>"}' with confidence ${
          field.confidence
        }`
      );
      // The recognized form fields with an unlabeled custom model will also include data about recognized labels.
      console.log(`  Label: '${field.labelData?.text}'`);
    }
  }
}

async function recognizeCustomForm(
  fileName: string,
  endpoint: string,
  apiKey: string,
  modelId: string
): Promise<RecognizedForm[] | undefined> {
  console.log(`Staring recognition using model "${modelId}"...`);
  const readStream = fs.createReadStream(fileName);
  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeCustomForms(modelId, readStream, {
    contentType: "image/jpeg",
    onProgress: (state) => {
      console.log(`  status (${modelId}): ${state.status}`);
    }
  });

  const forms = await poller.pollUntilDone();

  if (forms.length === 0) {
    throw new Error(`Failed to extract data using model "${modelId}".`);
  }

  return forms;
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
