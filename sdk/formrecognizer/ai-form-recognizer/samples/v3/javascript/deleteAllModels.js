// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates model deletion by iterating over all models in a
 * Form Recognizer account and deleting them one-by-one.
 *
 * This sample WILL DELETE ALL MODELS IN A FORM RECOGNIZER ACCOUNT.
 *
 * @summary delete all the models in a Form Recognizer account
 */

const { FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "<api key>";

  const client = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  if (process.env.REALLY_DELETE_ALL_MODELS !== "yes") {
    console.error(
      [
        "This sample will delete ALL models in the Form Recognizer resource",
        `${endpoint}.`,
        "",
        "If you are sure you wish to continue, set the following environment",
        "variable and run the sample again:",
        "",
        "REALLY_DELETE_ALL_MODELS=yes"
      ].join("\n")
    );
    return;
  }

  console.log("Deleting all models in", endpoint);

  // using `for await` syntax:
  const result = client.listCustomModels();
  const jobs = [];
  for await (const model of result) {
    jobs.push(
      client.deleteModel(model.modelId).then((resp) => {
        console.log(`- Deleted ${model.modelId}: ${resp._response.status}`);
      })
    );
  }

  await Promise.all(jobs);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
