// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation that retrieves information about a capacity reservation group.
 *
 * @summary the operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/BlockCapacityReservationGroup_Get.json
 */
async function getABlockCapacityReservationGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.get(
    "myResourceGroup",
    "blockCapacityReservationGroup",
    { expand: "instanceView" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation that retrieves information about a capacity reservation group.
 *
 * @summary the operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservationGroup_Get.json
 */
async function getACapacityReservationGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.get(
    "myResourceGroup",
    "myCapacityReservationGroup",
    { expand: "instanceView" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation that retrieves information about a capacity reservation group.
 *
 * @summary the operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/TargetedCapacityReservationGroup_Get.json
 */
async function getATargetedCapacityReservationGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.get(
    "myResourceGroup",
    "targetedCapacityReservationGroup",
    { expand: "instanceView" },
  );
  console.log(result);
}

async function main() {
  await getABlockCapacityReservationGroup();
  await getACapacityReservationGroup();
  await getATargetedCapacityReservationGroup();
}

main().catch(console.error);
