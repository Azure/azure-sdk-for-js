// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update a proximity placement group.
 *
 * @summary Create or update a proximity placement group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/proximityPlacementGroupExamples/ProximityPlacementGroup_CreateOrUpdate.json
 */
async function createOrUpdateAProximityPlacementGroup() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const proximityPlacementGroupName = "myProximityPlacementGroup";
  const parameters = {
    intent: { vmSizes: ["Basic_A0", "Basic_A2"] },
    location: "westus",
    proximityPlacementGroupType: "Standard",
    zones: ["1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.proximityPlacementGroups.createOrUpdate(
    resourceGroupName,
    proximityPlacementGroupName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAProximityPlacementGroup();
}

main().catch(console.error);
