// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified DDoS protection plan.
 *
 * @summary deletes the specified DDoS protection plan.
 * x-ms-original-file: 2025-05-01/DdosProtectionPlanDelete.json
 */
async function deleteDDoSProtectionPlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.ddosProtectionPlans.delete("rg1", "test-plan");
}

async function main() {
  await deleteDDoSProtectionPlan();
}

main().catch(console.error);
