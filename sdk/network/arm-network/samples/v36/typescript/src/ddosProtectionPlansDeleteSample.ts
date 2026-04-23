// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified DDoS protection plan.
 *
 * @summary Deletes the specified DDoS protection plan.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/DdosProtectionPlanDelete.json
 */
async function deleteDDoSProtectionPlan(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const ddosProtectionPlanName = "test-plan";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ddosProtectionPlans.beginDeleteAndWait(
    resourceGroupName,
    ddosProtectionPlanName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteDDoSProtectionPlan();
}

main().catch(console.error);
