// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove existing user from existing group.
 *
 * @summary remove existing user from existing group.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteGroupUser.json
 */
async function apiManagementDeleteGroupUser() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.groupUser.delete("rg1", "apimService1", "templategroup", "59307d350af58404d8a26300");
}

async function main() {
  await apiManagementDeleteGroupUser();
}

main().catch(console.error);
