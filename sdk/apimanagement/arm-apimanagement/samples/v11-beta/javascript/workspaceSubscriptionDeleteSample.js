// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified subscription.
 *
 * @summary deletes the specified subscription.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceSubscription.json
 */
async function apiManagementDeleteWorkspaceSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceSubscription.delete("rg1", "apimService1", "wks1", "testsub", "*");
}

async function main() {
  await apiManagementDeleteWorkspaceSubscription();
}

main().catch(console.error);
