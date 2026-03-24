// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the Documentation by its identifier.
 *
 * @summary gets the entity state (Etag) version of the Documentation by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadDocumentation.json
 */
async function apiManagementHeadDocumentation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.documentation.getEntityTag("rg1", "apimService1", "57d1f7558aa04f15146d9d8a");
}

async function main() {
  await apiManagementHeadDocumentation();
}

main().catch(console.error);
