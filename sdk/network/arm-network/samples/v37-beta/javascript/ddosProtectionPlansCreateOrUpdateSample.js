// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a DDoS protection plan.
 *
 * @summary creates or updates a DDoS protection plan.
 * x-ms-original-file: 2025-05-01/DdosProtectionPlanCreate.json
 */
async function createDDoSProtectionPlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ddosProtectionPlans.createOrUpdate("rg1", "test-plan", {
    location: "westus",
  });
  console.log(result);
}

async function main() {
  await createDDoSProtectionPlan();
}

main().catch(console.error);
