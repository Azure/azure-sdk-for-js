// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a server firewall rule.
 *
 * @summary Deletes a server firewall rule.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/FirewallRuleDelete.json
 */

import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

async function firewallRuleDelete(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "testserver";
  const firewallRuleName = "rule1";
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    firewallRuleName,
  );
  console.log(result);
}

firewallRuleDelete().catch(console.error);
