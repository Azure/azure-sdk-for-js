// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation that retrieves information about the capacity reservation.
 *
 * @summary The operation that retrieves information about the capacity reservation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/BlockCapacityReservation_Get.json
 */
async function getABlockCapacityReservation() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const capacityReservationGroupName = "blockCapacityReservationGroup";
  const capacityReservationName = "blockCapacityReservation";
  const expand = "instanceView";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservations.get(
    resourceGroupName,
    capacityReservationGroupName,
    capacityReservationName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation that retrieves information about the capacity reservation.
 *
 * @summary The operation that retrieves information about the capacity reservation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/CapacityReservation_Get.json
 */
async function getACapacityReservation() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const capacityReservationGroupName = "myCapacityReservationGroup";
  const capacityReservationName = "myCapacityReservation";
  const expand = "instanceView";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservations.get(
    resourceGroupName,
    capacityReservationGroupName,
    capacityReservationName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation that retrieves information about the capacity reservation.
 *
 * @summary The operation that retrieves information about the capacity reservation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/TargetedCapacityReservation_Get.json
 */
async function getATargetedCapacityReservation() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const capacityReservationGroupName = "targetedCapacityReservationGroup";
  const capacityReservationName = "targetedCapacityReservation";
  const expand = "instanceView";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservations.get(
    resourceGroupName,
    capacityReservationGroupName,
    capacityReservationName,
    options,
  );
  console.log(result);
}

async function main() {
  await getABlockCapacityReservation();
  await getACapacityReservation();
  await getATargetedCapacityReservation();
}

main().catch(console.error);
