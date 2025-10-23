// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary the operation to create or update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/BlockCapacityReservationGroup_CreateOrUpdate.json
 */
async function createOrUpdateABlockCapacityReservationGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.createOrUpdate(
    "myResourceGroup",
    "blockCapacityReservationGroup",
    {
      location: "westus",
      tags: { department: "finance" },
      zones: ["1", "2"],
      properties: { reservationType: "Block" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary the operation to create or update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservationGroup_CreateOrUpdate.json
 */
async function createOrUpdateACapacityReservationGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.createOrUpdate(
    "myResourceGroup",
    "myCapacityReservationGroup",
    {
      location: "westus",
      tags: { department: "finance" },
      zones: ["1", "2"],
      properties: {
        sharingProfile: {
          subscriptionIds: [
            { id: "/subscriptions/{subscription-id1}" },
            { id: "/subscriptions/{subscription-id2}" },
          ],
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary the operation to create or update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/TargetedCapacityReservationGroup_CreateOrUpdate.json
 */
async function createOrUpdateATargetedCapacityReservationGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.createOrUpdate(
    "myResourceGroup",
    "targetedCapacityReservationGroup",
    {
      location: "westus",
      tags: { department: "finance" },
      zones: ["1", "2"],
      properties: {
        sharingProfile: {
          subscriptionIds: [
            { id: "/subscriptions/{subscription-id1}" },
            { id: "/subscriptions/{subscription-id2}" },
          ],
        },
        reservationType: "Targeted",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateABlockCapacityReservationGroup();
  await createOrUpdateACapacityReservationGroup();
  await createOrUpdateATargetedCapacityReservationGroup();
}

main().catch(console.error);
