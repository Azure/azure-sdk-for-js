// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use image embeddings client to get the image embeddings for a given image.
 * @summary Given an AIProjectClient, this sample demonstrates how to get the image embeddings for a given image.
 * Get the image embeddings for a given image.
 */
const path = require("path");
const { readFile } = require("node:fs/promises");
const ModelClient = require("@azure-rest/ai-inference").default,
  { isUnexpected } = require("@azure-rest/ai-inference");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const deploymentName =
  process.env["IMAGE_EMBEDDING_DEPLOYMENT_NAME"] || "<embedding deployment name>";

async function main() {
  const parsedUrl = new URL(endpoint);
  const inferenceEndpoint = `https://${parsedUrl.hostname}/models`;
  const modelClient = ModelClient(inferenceEndpoint, new DefaultAzureCredential(), {
    credentials: {
      scopes: ["https://cognitiveservices.azure.com/.default"],
    },
  });
  const client = modelClient.path("/images/embeddings");
  const imagePath = path.resolve(__dirname, "sample1.png");
  const ext = path.extname(imagePath).slice(1); // e.g., 'png', 'jpg', 'jpeg'
  const mineType = `image/${ext === "jpg" ? "jpeg" : ext}`;
  const imageBuffer = await readFile(imagePath);
  // base64 url encoded image
  const base64Data = imageBuffer.toString("base64");
  const imageUrl = `data:${mineType};base64,${base64Data}`;
  const response = await client.post({
    body: {
      model: deploymentName,
      input: [{ image: imageUrl }],
    },
  });

  console.log("response = ", response);
  if (isUnexpected(response)) {
    throw response.body.error;
  }

  for (const item of response.body.data) {
    console.log(item.embedding.length);
    console.log(item.embedding);
  }
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
