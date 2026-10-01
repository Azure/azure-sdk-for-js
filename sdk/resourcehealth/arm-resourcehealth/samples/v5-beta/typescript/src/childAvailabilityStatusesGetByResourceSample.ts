// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets current availability status for a single resource
 *
 * @summary gets current availability status for a single resource
 * x-ms-original-file: 2025-05-01/ChildAvailabilityStatus_GetByResource.json
 */
async function getChildCurrentHealthByResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.childAvailabilityStatuses.getByResource(
    "subscriptions/227b734f-e14f-4de6-b7fc-3190c21e69f6/resourceGroups/JUHACKETRHCTEST/providers/Microsoft.Compute/virtualMachineScaleSets/rhctest/virtualMachines/4",
    { expand: "recommendedactions" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getChildCurrentHealthByResource();
}

main().catch(console.error);
