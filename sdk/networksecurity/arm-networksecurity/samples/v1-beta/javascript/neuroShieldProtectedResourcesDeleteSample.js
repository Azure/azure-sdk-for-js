// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a protected resource under a NeuroShield resource.
 *
 * @summary deletes a protected resource under a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_Delete.json
 */
async function deleteProtectedResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  await client.neuroShieldProtectedResources.delete("myResourceGroup", "myNeuroShield", "vm-01");
}

async function main() {
  await deleteProtectedResource();
}

main().catch(console.error);
