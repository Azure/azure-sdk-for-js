// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a NeuroShield resource.
 *
 * @summary deletes a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShields_Delete.json
 */
async function deleteNeuroShieldResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  await client.neuroShields.delete("myResourceGroup", "myNeuroShield");
}

async function main() {
  await deleteNeuroShieldResource();
}

main().catch(console.error);
