// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specific Api Version Set.
 *
 * @summary deletes specific Api Version Set.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiVersionSet.json
 */
async function apiManagementDeleteApiVersionSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiVersionSet.delete("rg1", "apimService1", "a1", "*");
}

async function main() {
  await apiManagementDeleteApiVersionSet();
}

main().catch(console.error);
