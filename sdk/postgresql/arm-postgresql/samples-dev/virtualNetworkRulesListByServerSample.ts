// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementClient } from "@azure/arm-postgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets a list of virtual network rules in a server.
 *
 * @summary Gets a list of virtual network rules in a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2017-12-01/examples/VirtualNetworkRulesList.json
 */
async function listVirtualNetworkRules(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "vnet-test-svr";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkRules.listByServer(resourceGroupName, serverName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

listVirtualNetworkRules().catch(console.error);
