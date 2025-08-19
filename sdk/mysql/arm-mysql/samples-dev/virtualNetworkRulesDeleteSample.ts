// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the virtual network rule with the given name.
 *
 * @summary Deletes the virtual network rule with the given name.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2017-12-01/examples/VirtualNetworkRulesDelete.json
 */

import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteAVirtualNetworkRule(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "vnet-test-svr";
  const virtualNetworkRuleName = "vnet-firewall-rule";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkRules.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    virtualNetworkRuleName,
  );
  console.log(result);
}

deleteAVirtualNetworkRule().catch(console.error);
