// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a DDoS protection plan tags.
 *
 * @summary update a DDoS protection plan tags.
 * x-ms-original-file: 2025-05-01/DdosProtectionPlanUpdateTags.json
 */
async function dDoSProtectionPlanUpdateTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ddosProtectionPlans.updateTags("rg1", "test-plan", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await dDoSProtectionPlanUpdateTags();
}

main().catch(console.error);
