// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves information about a proximity placement group .
 *
 * @summary Retrieves information about a proximity placement group .
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/proximityPlacementGroupExamples/ProximityPlacementGroup_Get.json
 */
async function getProximityPlacementGroups() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const proximityPlacementGroupName = "myProximityPlacementGroup";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.proximityPlacementGroups.get(
    resourceGroupName,
    proximityPlacementGroupName,
  );
  console.log(result);
}

async function main() {
  await getProximityPlacementGroups();
}

main().catch(console.error);
