// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the DelegationSettings.
 *
 * @summary gets the entity state (Etag) version of the DelegationSettings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadDelegationSettings.json
 */
async function apiManagementHeadDelegationSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.delegationSettings.getEntityTag("rg1", "apimService1");
}

async function main() {
  await apiManagementHeadDelegationSettings();
}

main().catch(console.error);
