// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze a form from a document with an
 * unlabeled custom model. The form must be of the same type as the forms the
 * custom model was trained on. To learn how to train your own models, see the
 * `trainUnlabeledModel` and `trainLabeledModel` samples.
 *
 * @summary extract information from forms using a custom trained model
 * @azsdk-weight 110
 */

import { FormRecognizerClient, AzureKeyCredential, Point2D } from "@azure/ai-form-recognizer";

import * as fs from "fs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Make a string representing a bounding box.
 */
function boundingBoxToString(box: Point2D[]): string {
  let out = "[";
  for (const { x, y } of box) {
    out += `(${x}, ${y}),`;
  }
  // Remove the last comma and add the closing bracket
  return out.slice(0, -1) + "]";
}

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "<api key>";
  const modelId = process.env["CUSTOM_MODEL_ID"] ?? "<unlabeled custom model id>";

  // The form you are recognizing must be of the same type as the forms the custom model was trained on
  const fileName = "./assets/forms/Form_1.jpg";

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expected file "${fileName}" to exist.`);
  }

  const readStream = fs.createReadStream(fileName);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeCustomForms(modelId, readStream, {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });
  const forms = await poller.pollUntilDone();

  if (forms.length === 0) {
    throw new Error("Failed to extract data from at least one form.");
  }

  console.log("Forms:");
  for (const form of forms ?? []) {
    console.log(`- ${form.formType}, page range: ${form.pageRange}`);
    console.log("  Pages:");
    for (const page of form.pages ?? []) {
      console.log(`  - Page number: ${page.pageNumber}`);
      console.log("    Tables:");
      for (const table of page.tables ?? []) {
        console.log(`    - (${table.rowCount} x ${table.columnCount}`);
        for (const cell of table.cells) {
          console.log(`      cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
        }
      }
      console.log("    Selection Marks:");
      for (const mark of page.selectionMarks ?? []) {
        const box = boundingBoxToString(mark.boundingBox);
        console.log(`    - ${mark.state} @(${box}) (${mark.confidence} confidence)`);
      }
    }

    console.log("  Fields:");
    for (const [fieldName, field] of Object.entries(form.fields)) {
      // Each field is of type FormField.
      console.log(
        `  - ${fieldName} (${field.valueType}): '${field.value ?? "<missing>"}' with confidence ${
          field.confidence
        }`
      );
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
