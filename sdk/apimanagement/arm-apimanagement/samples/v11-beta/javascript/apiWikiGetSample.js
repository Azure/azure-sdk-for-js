// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the Wiki for an API specified by its identifier.
 *
 * @summary gets the details of the Wiki for an API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiWiki.json
 */
async function apiManagementGetApiWiki() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiWiki.get("rg1", "apimService1", "57d1f7558aa04f15146d9d8a");
  console.log(result);
}

async function main() {
  await apiManagementGetApiWiki();
}

main().catch(console.error);
