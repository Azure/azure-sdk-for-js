// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete API for managed network settings of a cognitive services account.
 *
 * @summary delete API for managed network settings of a cognitive services account.
 * x-ms-original-file: 2026-01-15-preview/ManagedNetwork/deleteManagedNetworkV2.json
 */
async function deleteManagedNetworkSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.managedNetworkSettings.delete("test-rg", "cognitive-account-name", "default");
}

async function main(): Promise<void> {
  await deleteManagedNetworkSettings();
}

main().catch(console.error);
