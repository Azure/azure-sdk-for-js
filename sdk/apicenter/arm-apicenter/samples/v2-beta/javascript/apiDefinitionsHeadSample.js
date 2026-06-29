// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks if specified API definition exists.
 *
 * @summary checks if specified API definition exists.
 * x-ms-original-file: 2024-06-01-preview/ApiDefinitions_Head.json
 */
async function apiDefinitionsHead() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.apiDefinitions.head(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "2023-01-01",
    "openapi",
  );
}

async function main() {
  await apiDefinitionsHead();
}

main().catch(console.error);
