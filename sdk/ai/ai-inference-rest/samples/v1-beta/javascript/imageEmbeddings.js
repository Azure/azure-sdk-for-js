// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get image embeddings from a model endpoint.
 *
 * @summary Get image embeddings.
 */

const ModelClient = require("@azure-rest/ai-inference").default,
  { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require("node:fs");

// Load the .env file if it exists
require("dotenv/config");
// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];
const modelName = process.env["MODEL_NAME"];
const imageFilePath = "sample1.png";
const imageFormat = "png"; // "jpeg", "png", etc.

async function main() {
  console.log("== Image Embeddings Sample ==");

  const client = createModelClient();

  const image = getImageDataUrl(imageFilePath, imageFormat);

  const response = await client.path("/images/embeddings").post({
    body: {
      input: [{ image }],
      model: modelName,
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }
  for (const data of response.body.data) {
    console.log(data);
  }
  console.log(response.body.usage);
}

/*
 * This function creates a model client.
 */
function createModelClient() {
  // auth scope for AOAI resources is currently https://cognitiveservices.azure.com/.default
  // auth scope for MaaS and MaaP is currently https://ml.azure.com/.default
  if (key) {
    return ModelClient(endpoint, new AzureKeyCredential(key));
  } else {
    const scopes = [];
    if (endpoint.includes(".models.ai.azure.com")) {
      scopes.push("https://ml.azure.com");
    } else if (endpoint.includes(".openai.azure.com/openai/deployments/")) {
      scopes.push("https://cognitiveservices.azure.com");
    }

    const clientOptions = { credentials: { scopes } };
    return ModelClient(endpoint, new DefaultAzureCredential(), clientOptions);
  }
}

/**
 * Get the data URL of an image file.
 * @param {string} imageFile - The path to the image file.
 * @param {string} imageFormatType - The format of the image file. For example: "jpeg", "png".
 * @returns {string} The data URL of the image.
 */
function getImageDataUrl(imageFile, imageFormatType) {
  try {
    const imageBuffer = fs.readFileSync(imageFile);
    const imageBase64 = imageBuffer.toString("base64");
    return `data:image/${imageFormatType};base64,${imageBase64}`;
  } catch (error) {
    console.error(`Could not read '${imageFile}'.`);
    console.error("Set the correct path to the image file before running this sample.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
