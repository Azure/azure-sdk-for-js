// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about a proximity placement group .
 *
 * @summary retrieves information about a proximity placement group .
 * x-ms-original-file: 2025-04-01/proximityPlacementGroupExamples/ProximityPlacementGroup_Get.json
 */
async function getProximityPlacementGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.proximityPlacementGroups.get(
    "myResourceGroup",
    "myProximityPlacementGroup",
  );
  console.log(result);
}

async function main() {
  await getProximityPlacementGroups();
}

main().catch(console.error);
