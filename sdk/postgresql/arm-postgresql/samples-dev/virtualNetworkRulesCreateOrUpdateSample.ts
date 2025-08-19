// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an existing virtual network rule.
 *
 * @summary Creates or updates an existing virtual network rule.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2017-12-01/examples/VirtualNetworkRulesCreateOrUpdate.json
 */

import type { VirtualNetworkRule } from "@azure/arm-postgresql";
import { PostgreSQLManagementClient } from "@azure/arm-postgresql";
import { DefaultAzureCredential } from "@azure/identity";

async function createOrUpdateAVirtualNetworkRule(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "vnet-test-svr";
  const virtualNetworkRuleName = "vnet-firewall-rule";
  const parameters: VirtualNetworkRule = {
    ignoreMissingVnetServiceEndpoint: false,
    virtualNetworkSubnetId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestGroup/providers/Microsoft.Network/virtualNetworks/testvnet/subnets/testsubnet",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    virtualNetworkRuleName,
    parameters,
  );
  console.log(result);
}

createOrUpdateAVirtualNetworkRule().catch(console.error);
