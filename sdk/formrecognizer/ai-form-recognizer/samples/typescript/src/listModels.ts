// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * List Form Recognizer custom models
 */

//import { FormTrainingClient, FormRecognizerApiKeyCredential } from "@azure/ai-form-recognizer";
import { FormTrainingClient, FormRecognizerApiKeyCredential } from "../../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running listModels sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";

  const client = new FormTrainingClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));

  // using `for await` syntax:
  const result = client.listModels();
  let i = 0;
  for await (const model of result) {
    console.log(`model ${i++}:`);
    console.log(model);
  }

  // using `iter.next()`
  i = 1;
  let iter = client.listModels();
  let modelItem = await iter.next();
  while (!modelItem.done) {
    console.log(`model ${i++}: ${modelItem.value.modelId}`);
    modelItem = await iter.next();
  }

  // using `byPage()`
  i = 1;
  for await (const response of client.listModels().byPage()) {
    for (const modelInfo of response.modelList!) {
      console.log(`model ${i++}: ${modelInfo.modelId}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
