// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the authoring status on a landing zone configuration.
 *
 * @summary update the authoring status on a landing zone configuration.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneConfigurationOperations_UpdateAuthoringStatus.json
 */
async function landingZoneConfigurationOperationsUpdateAuthoringStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneConfigurationOperations.updateAuthoringStatus(
    "ExampleResourceGroup",
    "ExampleLZA",
    "ExampleLZC",
    { authoringStatus: "Authoring" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneConfigurationOperationsUpdateAuthoringStatus();
}

main().catch(console.error);
