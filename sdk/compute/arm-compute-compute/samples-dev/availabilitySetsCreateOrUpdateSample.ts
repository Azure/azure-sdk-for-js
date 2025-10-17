// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an availability set.
 *
 * @summary create or update an availability set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_Create.json
 */
async function createAnAvailabilitySet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.availabilitySets.createOrUpdate(
    "myResourceGroup",
    "myAvailabilitySet",
    {
      location: "westus",
      properties: {
        platformFaultDomainCount: 2,
        platformUpdateDomainCount: 20,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an availability set.
 *
 * @summary create or update an availability set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_Create_WithScheduledEventProfile.json
 */
async function createAnAvailabilitySetWithScheduledEventPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.availabilitySets.createOrUpdate(
    "myResourceGroup",
    "myAvailabilitySet",
    {
      location: "westus",
      properties: {
        platformFaultDomainCount: 2,
        platformUpdateDomainCount: 20,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnAvailabilitySet();
  await createAnAvailabilitySetWithScheduledEventPolicy();
}

main().catch(console.error);
