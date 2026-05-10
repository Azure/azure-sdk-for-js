// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an existing virtual network rule.
 *
 * @summary creates or updates an existing virtual network rule.
 * x-ms-original-file: 2025-02-01-preview/VirtualNetworkRulesCreateOrUpdate.json
 */
async function createOrUpdateAVirtualNetworkRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkRules.createOrUpdate(
    "Default",
    "vnet-test-svr",
    "vnet-firewall-rule",
    {
      ignoreMissingVnetServiceEndpoint: false,
      virtualNetworkSubnetId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Network/virtualNetworks/testvnet/subnets/testsubnet",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAVirtualNetworkRule();
}

main().catch(console.error);
