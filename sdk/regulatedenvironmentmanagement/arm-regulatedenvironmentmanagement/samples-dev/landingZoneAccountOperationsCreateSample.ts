// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a landing zone account.
 *
 * @summary create a landing zone account.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneAccountOperations_Create.json
 */
async function landingZoneAccountOperationsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneAccountOperations.create(
    "SampleResourceGroup",
    "ExampleLZA",
    {
      properties: {
        storageAccount:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-examplegroup/providers/Microsoft.Storage/storageAccounts/saexample",
      },
      identity: {
        userAssignedIdentities: {
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-examplegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/mi-exampleidentity":
            {},
        },
      },
      tags: { tag1: "MCFS" },
      location: "northeurope",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneAccountOperationsCreate();
}

main().catch(console.error);
