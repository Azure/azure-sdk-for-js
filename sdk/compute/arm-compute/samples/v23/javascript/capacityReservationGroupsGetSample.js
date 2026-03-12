// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation that retrieves information about a capacity reservation group.
 *
 * @summary The operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/BlockCapacityReservationGroup_Get.json
 */
async function getABlockCapacityReservationGroup() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const capacityReservationGroupName = "blockCapacityReservationGroup";
  const expand = "instanceView";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.get(
    resourceGroupName,
    capacityReservationGroupName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation that retrieves information about a capacity reservation group.
 *
 * @summary The operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/CapacityReservationGroup_Get.json
 */
async function getACapacityReservationGroup() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const capacityReservationGroupName = "myCapacityReservationGroup";
  const expand = "instanceView";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.get(
    resourceGroupName,
    capacityReservationGroupName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation that retrieves information about a capacity reservation group.
 *
 * @summary The operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/TargetedCapacityReservationGroup_Get.json
 */
async function getATargetedCapacityReservationGroup() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const capacityReservationGroupName = "targetedCapacityReservationGroup";
  const expand = "instanceView";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.get(
    resourceGroupName,
    capacityReservationGroupName,
    options,
  );
  console.log(result);
}

async function main() {
  await getABlockCapacityReservationGroup();
  await getACapacityReservationGroup();
  await getATargetedCapacityReservationGroup();
}

main().catch(console.error);
