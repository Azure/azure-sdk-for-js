// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a PlacementPolicy
 *
 * @summary get a PlacementPolicy
 * x-ms-original-file: 2024-09-01/PlacementPolicies_Get.json
 */
async function placementPoliciesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.placementPolicies.get("group1", "cloud1", "cluster1", "policy1");
  console.log(result);
}

async function main() {
  await placementPoliciesGet();
}

main().catch(console.error);
