// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the specified DDoS protection plan.
 *
 * @summary gets information about the specified DDoS protection plan.
 * x-ms-original-file: 2025-05-01/DdosProtectionPlanGet.json
 */
async function getDDoSProtectionPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ddosProtectionPlans.get("rg1", "test-plan");
  console.log(result);
}

async function main(): Promise<void> {
  await getDDoSProtectionPlan();
}

main().catch(console.error);
