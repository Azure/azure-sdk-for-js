// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary the operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/BlockCapacityReservation_CreateOrUpdate.json
 */
async function createOrUpdateABlockCapacityReservation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.capacityReservations.createOrUpdate(
    "myResourceGroup",
    "blockCapacityReservationGroup",
    "blockCapacityReservation",
    {
      location: "westus",
      tags: { department: "HR" },
      sku: { name: "Standard_ND96isr_H100_v5", capacity: 1 },
      properties: {
        scheduleProfile: { start: "2025-08-01", end: "2025-08-02" },
      },
      zones: ["1"],
    },
  );
}

/**
 * This sample demonstrates how to the operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary the operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservation_CreateOrUpdate.json
 */
async function createOrUpdateACapacityReservation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.capacityReservations.createOrUpdate(
    "myResourceGroup",
    "myCapacityReservationGroup",
    "myCapacityReservation",
    {
      location: "westus",
      tags: { department: "HR" },
      sku: { name: "Standard_DS1_v2", capacity: 4 },
      zones: ["1"],
    },
  );
}

/**
 * This sample demonstrates how to the operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary the operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/TargetedCapacityReservation_CreateOrUpdate.json
 */
async function createOrUpdateATargetedCapacityReservation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.capacityReservations.createOrUpdate(
    "myResourceGroup",
    "targetedCapacityReservationGroup",
    "targetedCapacityReservation",
    {
      location: "westus",
      tags: { department: "HR" },
      sku: { name: "Standard_DS1_v2", capacity: 4 },
      zones: ["1"],
    },
  );
}

async function main(): Promise<void> {
  await createOrUpdateABlockCapacityReservation();
  await createOrUpdateACapacityReservation();
  await createOrUpdateATargetedCapacityReservation();
}

main().catch(console.error);
