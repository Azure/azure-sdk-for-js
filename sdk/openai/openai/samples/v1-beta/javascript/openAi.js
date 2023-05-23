// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt using OpenAI API.
 *
 * @summary get completions using the OpenAI API.
 */

const { OpenAIClient } = require("@azure/openai");

// Load the .env file if it exists
const dotenv = require("dotenv");
const { OpenAIKeyCredential } = require("@azure/openai");
dotenv.config();

// You will need to set these environment variables or edit the following values
const openApiKey = process.env["OPENAI_API_KEY"] || "<api key>";

const prompt = ["What is Azure OpenAI?"];

async function main() {
  console.log("== Get completions using OpenAI Sample ==");

  const client = new OpenAIClient(new OpenAIKeyCredential(openApiKey));
  const model = "text-davinci-003";
  const result = await client.getCompletions(model, prompt);

  for (const choice of result.choices) {
    console.log(choice.text);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
