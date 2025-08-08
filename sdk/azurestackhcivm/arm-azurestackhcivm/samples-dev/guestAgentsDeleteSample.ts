// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements GuestAgent DELETE method.
 *
 * @summary implements GuestAgent DELETE method.
 * x-ms-original-file: 2025-06-01-preview/GuestAgents_Delete.json
 */
async function deleteGuestAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.guestAgents.delete(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  );
}

async function main(): Promise<void> {
  await deleteGuestAgent();
}

main().catch(console.error);
