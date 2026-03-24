// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specific user.
 *
 * @summary deletes specific user.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteUser.json
 */
async function apiManagementDeleteUser() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.user.delete("rg1", "apimService1", "5931a75ae4bbd512288c680b", "*");
}

async function main() {
  await apiManagementDeleteUser();
}

main().catch(console.error);
