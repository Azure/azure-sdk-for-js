// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the firewall rules in a given server.
 *
 * @summary list all the firewall rules in a given server.
 * x-ms-original-file: 2024-12-30/FirewallRulesListByServer.json
 */
async function listAllFirewallRulesInAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallRules.listByServer("TestGroup", "testserver")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllFirewallRulesInAServer();
}

main().catch(console.error);
