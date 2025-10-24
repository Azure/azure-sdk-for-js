// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve protection policy with specified name within a resource group.
 *
 * @summary Retrieve protection policy with specified name within a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-10-01/examples/WafPolicyGet.json
 */
async function getsAWafPolicyWithinAResourceGroup(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const policyName = "Policy1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.webApplicationFirewallPolicies.get(
    resourceGroupName,
    policyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAWafPolicyWithinAResourceGroup();
}

main().catch(console.error);
