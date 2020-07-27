// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get detailed information to visualize the outlines of
 * form content and fields, which can be used for manual validation and drawing UI as part of an application.
 */

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const modelId = process.env["CUSTOM_MODEL_ID"] || "<custom model id>";
  // The form you are recognizing must be of the same type as the forms the custom model was trained on
  const path = "./assets/Invoice_6.pdf";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeCustomForms(modelId, readStream, "application/pdf", {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });
  const forms = await poller.pollUntilDone();

  console.log("Forms:");
  let i = 0;
  for (const form of forms || []) {
    console.log(`  Form #${i++} has type ${form.formType}`);
    console.log("  Fields:");
    for (const fieldName in form.fields) {
      // each field is of type FormField
      const field = form.fields[fieldName];
      const boundingBox =
        field.valueData && field.valueData.boundingBox
          ? field.valueData.boundingBox.map((p) => `[${p.x},${p.y}]`).join(", ")
          : "N/A";
      console.log(
        `    Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence} within bounding box ${boundingBox}`
      );
    }
    console.log("  Pages:");
    for (const page of form.pages || []) {
      console.log(
        `    Page #${page.pageNumber} with width ${page.width}, height ${page.height}, and text angle ${page.textAngle}`
      );
      console.log("    Tables");
      for (const table of page.tables || []) {
        for (const cell of table.cells) {
          console.log(
            `      Cell[${cell.rowIndex},${cell.columnIndex}] has text ${cell.text} with confidence ${cell.confidence} based on the following words:`
          );
          for (const element of cell.fieldElements || []) {
            const boundingBox = element.boundingBox
              ? element.boundingBox.map((p) => `[${p.x},${p.y}]`).join(", ")
              : "N/A";
            console.log(`        '${element.text}' within bounding box ${boundingBox}`);
          }
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
