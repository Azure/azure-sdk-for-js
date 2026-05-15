// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a network manager routing configuration routing rule.
 *
 * @summary gets a network manager routing configuration routing rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingRuleGet.json
 */
async function getsRoutingRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routingRules.get(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    "SampleRoutingRule",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsRoutingRule();
}

main().catch(console.error);
