// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing issue for an API.
 *
 * @summary updates an existing issue for an API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateApiIssue.json
 */
async function apiManagementUpdateApiIssue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiIssue.update(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    "57d2ef278aa04f0ad01d6cdc",
    "*",
    { state: "closed" },
  );
  console.log(result);
}

async function main() {
  await apiManagementUpdateApiIssue();
}

main().catch(console.error);
