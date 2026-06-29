// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specified API definition.
 *
 * @summary deletes specified API definition.
 * x-ms-original-file: 2024-06-01-preview/ApiDefinitions_Delete.json
 */
async function apiDefinitionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.apiDefinitions.delete(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "2023-01-01",
    "openapi",
  );
}

async function main() {
  await apiDefinitionsDelete();
}

main().catch(console.error);
