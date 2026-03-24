// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Product from the specified client application.
 *
 * @summary deletes the specified Product from the specified client application.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteClientApplicationProductLink.json
 */
async function apiManagementDeleteClientApplicationProductLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.clientApplicationProductLink.delete("rg1", "apimService1", "testAppId", "link1");
}

async function main() {
  await apiManagementDeleteClientApplicationProductLink();
}

main().catch(console.error);
