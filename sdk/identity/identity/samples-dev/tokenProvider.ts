// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary demonstrates how to get a bearer token.
 */

import { PipelineRequest, createPipelineRequest } from "@azure/core-rest-pipeline";
import { getBearerTokenProvider, DefaultAzureCredential } from "@azure/identity";
import { config } from "dotenv";

// Load the .env file if it exists
config();

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const scope = "https://cognitiveservices.azure.com/.default";
  const getAccessToken = getBearerTokenProvider(credential, scope);
  const token = await getAccessToken();

  // create a request
  const request: PipelineRequest = createPipelineRequest({ url: "https://example.com" });
  // add the access token to the request
  request.headers.set("Authorization", `Bearer ${token}`);
  console.log("Authorization header has been added to the request");
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
