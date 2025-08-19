// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FirewallRule } from "@azure/arm-mariadb";
import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Creates a new firewall rule or updates an existing firewall rule.
 *
 * @summary Creates a new firewall rule or updates an existing firewall rule.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/FirewallRuleCreate.json
 */
async function firewallRuleCreate(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "testserver";
  const firewallRuleName = "rule1";
  const parameters: FirewallRule = {
    endIpAddress: "255.255.255.255",
    startIpAddress: "0.0.0.0",
  };
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    firewallRuleName,
    parameters,
  );
  console.log(result);
}

firewallRuleCreate().catch(console.error);
