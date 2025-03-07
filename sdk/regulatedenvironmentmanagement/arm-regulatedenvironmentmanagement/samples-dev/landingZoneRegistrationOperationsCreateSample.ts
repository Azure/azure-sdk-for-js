// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a landing zone registration.
 *
 * @summary create a landing zone registration.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneRegistrationOperations_Create.json
 */
async function landingZoneRegistrationOperationsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneRegistrationOperations.create(
    "ExampleResourceGroup",
    "ExampleLZA",
    "ExampleLZR",
    {
      properties: {
        existingTopLevelMgId:
          "/providers/Microsoft.Management/managementGroups/mg-example",
        existingLandingZoneConfigurationId:
          "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/rg-examplegroup/providers/Microsoft.Sovereign/landingZoneAccounts/ExampleLZA/landingZoneConfigurations/ExampleLZC",
        managedIdentity: {
          type: "UserAssigned",
          userAssignedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/rg-examplegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/mi-example",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneRegistrationOperationsCreate();
}

main().catch(console.error);
