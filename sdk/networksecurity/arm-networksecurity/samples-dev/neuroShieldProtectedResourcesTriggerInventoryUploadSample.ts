// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to requests a fresh inventory upload from the Neuron agents associated with a protected resource.
 *
 * @summary requests a fresh inventory upload from the Neuron agents associated with a protected resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_TriggerInventoryUpload.json
 */
async function triggerAnInventoryUpload(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldProtectedResources.triggerInventoryUpload(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await triggerAnInventoryUpload();
}

main().catch(console.error);
