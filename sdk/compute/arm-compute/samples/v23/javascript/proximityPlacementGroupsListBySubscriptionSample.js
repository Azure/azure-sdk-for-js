// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all proximity placement groups in a subscription.
 *
 * @summary Lists all proximity placement groups in a subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/proximityPlacementGroupExamples/ProximityPlacementGroup_ListBySubscription.json
 */
async function listProximityPlacementGroups() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.proximityPlacementGroups.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listProximityPlacementGroups();
}

main().catch(console.error);
