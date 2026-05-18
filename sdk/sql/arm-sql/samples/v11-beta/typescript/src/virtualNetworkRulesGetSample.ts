// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a virtual network rule.
 *
 * @summary gets a virtual network rule.
 * x-ms-original-file: 2025-02-01-preview/VirtualNetworkRulesGet.json
 */
async function getsAVirtualNetworkRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkRules.get(
    "Default",
    "vnet-test-svr",
    "vnet-firewall-rule",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAVirtualNetworkRule();
}

main().catch(console.error);
