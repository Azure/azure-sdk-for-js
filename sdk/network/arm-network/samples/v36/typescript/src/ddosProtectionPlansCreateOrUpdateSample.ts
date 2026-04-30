// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DdosProtectionPlan} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a DDoS protection plan.
 *
 * @summary Creates or updates a DDoS protection plan.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/DdosProtectionPlanCreate.json
 */
async function createDDoSProtectionPlan(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const ddosProtectionPlanName = "test-plan";
  const parameters: DdosProtectionPlan = { location: "westus" };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ddosProtectionPlans.beginCreateOrUpdateAndWait(
    resourceGroupName,
    ddosProtectionPlanName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createDDoSProtectionPlan();
}

main().catch(console.error);
