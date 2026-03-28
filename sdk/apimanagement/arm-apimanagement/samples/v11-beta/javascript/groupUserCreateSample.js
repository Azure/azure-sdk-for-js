// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to add existing user to existing group
 *
 * @summary add existing user to existing group
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGroupUser.json
 */
async function apiManagementCreateGroupUser() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.groupUser.create(
    "rg1",
    "apimService1",
    "tempgroup",
    "59307d350af58404d8a26300",
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateGroupUser();
}

main().catch(console.error);
