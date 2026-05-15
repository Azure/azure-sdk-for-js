// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the available specified Network Virtual Appliance Inbound Security Rules Collection.
 *
 * @summary retrieves the available specified Network Virtual Appliance Inbound Security Rules Collection.
 * x-ms-original-file: 2025-05-01/InboundSecurityRuleGet.json
 */
async function createNetworkVirtualApplianceInboundSecurityRules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.inboundSecurityRule.get("rg1", "nva", "rule1");
  console.log(result);
}

async function main(): Promise<void> {
  await createNetworkVirtualApplianceInboundSecurityRules();
}

main().catch(console.error);
