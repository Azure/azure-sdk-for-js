// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates different ways to iterate through the list of models in
 * a cognitive service account.
 */

const { FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";

  const client = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  const result = client.listCustomModels();
  let i = 0;
  for await (const modelInfo of result) {
    console.log(`model ${i++}:`);
    console.log(modelInfo);
  }

  // using `iter.next()`
  i = 1;
  let iter = client.listCustomModels();
  let modelItem = await iter.next();
  while (!modelItem.done) {
    console.log(`model ${i++}: ${modelItem.value.modelId}`);
    modelItem = await iter.next();
  }

  // using `byPage()`
  i = 1;
  for await (const response of client.listCustomModels().byPage()) {
    for (const modelInfo of response.modelList) {
      console.log(`model ${i++}: ${modelInfo.modelId}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
