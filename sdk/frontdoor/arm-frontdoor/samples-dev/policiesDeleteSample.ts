// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes Policy
 *
 * @summary Deletes Policy
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2024-02-01/examples/WafPolicyDelete.json
 */
async function deleteProtectionPolicy(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "rg1";
  const policyName = "Policy1";
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.policies.beginDeleteAndWait(resourceGroupName, policyName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteProtectionPolicy();
}

main().catch(console.error);
