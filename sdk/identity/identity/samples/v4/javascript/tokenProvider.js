// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary demonstrates how to get a bearer token.
 */

const { createPipelineRequest } = require("@azure/core-rest-pipeline");
const { getBearerTokenProvider, DefaultAzureCredential } = require("@azure/identity");
const { config } = require("dotenv");

// Load the .env file if it exists
config();

async function main() {
  const credential = new DefaultAzureCredential();
  const scope = "https://cognitiveservices.azure.com/.default";
  const getAccessToken = getBearerTokenProvider(credential, scope);
  const token = await getAccessToken();

  // create a request
  const request = createPipelineRequest({ url: "https://example.com" });
  // add the access token to the request
  request.headers.set("Authorization", `Bearer ${token}`);
  console.log("Authorization header has been added to the request");
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});

module.exports = { main };
