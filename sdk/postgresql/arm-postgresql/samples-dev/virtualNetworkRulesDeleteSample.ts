// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the virtual network rule with the given name.
 *
 * @summary Deletes the virtual network rule with the given name.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2017-12-01/examples/VirtualNetworkRulesDelete.json
 */

import { PostgreSQLManagementClient } from "@azure/arm-postgresql";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteAVirtualNetworkRule(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "vnet-test-svr";
  const virtualNetworkRuleName = "vnet-firewall-rule";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkRules.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    virtualNetworkRuleName,
  );
  console.log(result);
}

deleteAVirtualNetworkRule().catch(console.error);
