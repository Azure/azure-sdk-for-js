// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a NeuroShield resource.
 *
 * @summary deletes a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShields_Delete.json
 */
async function deleteNeuroShieldResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  await client.neuroShields.delete("myResourceGroup", "myNeuroShield");
}

async function main(): Promise<void> {
  await deleteNeuroShieldResource();
}

main().catch(console.error);
