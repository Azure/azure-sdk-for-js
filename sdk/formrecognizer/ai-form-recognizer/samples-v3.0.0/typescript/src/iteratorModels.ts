// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates different ways to iterate through the list of models in
 * a cognitive service account.
 */

import { FormTrainingClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";

  const client = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  // using `for await` syntax:
  const result = client.listCustomModels();
  for await (const model of result) {
    console.log("- Model:", model.modelId);
  }

  // using `iter.next()`
  let iter = client.listCustomModels();
  let modelItem = await iter.next();
  while (!modelItem.done) {
    console.log("- Model:", modelItem.value.modelId);
    modelItem = await iter.next();
  }

  // using `byPage()`
  for await (const response of client.listCustomModels().byPage()) {
    for (const modelInfo of response.modelList!) {
      console.log("- Model:", modelInfo.modelId);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
