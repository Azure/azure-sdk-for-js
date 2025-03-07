// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a landing zone account.
 *
 * @summary update a landing zone account.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneAccountOperations_Update.json
 */
async function landingZoneAccountOperationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneAccountOperations.update(
    "ExampleResourceGroup",
    "ExampleLZA",
    {
      properties: {
        storageAccount:
          "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/TestStorageAccount/providers/Microsoft.Storage/storageAccounts/teststcontainer",
      },
      identity: { type: "SystemAssigned" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneAccountOperationsUpdate();
}

main().catch(console.error);
