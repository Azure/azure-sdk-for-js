// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a landing zone registration.
 *
 * @summary update a landing zone registration.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneRegistrationOperations_Update.json
 */
async function landingZoneRegistrationOperationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneRegistrationOperations.update(
    "ExampleResourceGroup",
    "ExampleLZA",
    "ExampleLZR",
    {
      properties: {
        existingTopLevelMgId: "/providers/Microsoft.Management/managementGroups/mcfs",
        existingLandingZoneConfigurationId:
          "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/TestResourceGroup/providers/Microsoft.Sovereign/landingZoneAccounts/ExampleLZA/landingZoneConfigurations/ExampleLZC",
        managedIdentity: { type: "SystemAssigned" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneRegistrationOperationsUpdate();
}

main().catch(console.error);
