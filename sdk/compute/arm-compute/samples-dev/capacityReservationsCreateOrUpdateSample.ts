// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CapacityReservation,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/BlockCapacityReservation_CreateOrUpdate.json
 */
async function createOrUpdateABlockCapacityReservation(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const capacityReservationGroupName = "blockCapacityReservationGroup";
  const capacityReservationName = "blockCapacityReservation";
  const parameters: CapacityReservation = {
    location: "westus",
    scheduleProfile: { end: "2025-08-02", start: "2025-08-01" },
    sku: { name: "Standard_ND96isr_H100_v5", capacity: 1 },
    tags: { department: "HR" },
    zones: ["1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    capacityReservationGroupName,
    capacityReservationName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/CapacityReservation_CreateOrUpdate.json
 */
async function createOrUpdateACapacityReservation(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const capacityReservationGroupName = "myCapacityReservationGroup";
  const capacityReservationName = "myCapacityReservation";
  const parameters: CapacityReservation = {
    location: "westus",
    sku: { name: "Standard_DS1_v2", capacity: 4 },
    tags: { department: "HR" },
    zones: ["1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    capacityReservationGroupName,
    capacityReservationName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/TargetedCapacityReservation_CreateOrUpdate.json
 */
async function createOrUpdateATargetedCapacityReservation(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const capacityReservationGroupName = "targetedCapacityReservationGroup";
  const capacityReservationName = "targetedCapacityReservation";
  const parameters: CapacityReservation = {
    location: "westus",
    sku: { name: "Standard_DS1_v2", capacity: 4 },
    tags: { department: "HR" },
    zones: ["1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    capacityReservationGroupName,
    capacityReservationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateABlockCapacityReservation();
  await createOrUpdateACapacityReservation();
  await createOrUpdateATargetedCapacityReservation();
}

main().catch(console.error);
