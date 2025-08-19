// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a server firewall rule.
 *
 * @summary Deletes a server firewall rule.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2017-12-01/examples/FirewallRuleDelete.json
 */

import { PostgreSQLManagementClient } from "@azure/arm-postgresql";
import { DefaultAzureCredential } from "@azure/identity";

async function firewallRuleDelete(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "testserver";
  const firewallRuleName = "rule1";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    firewallRuleName,
  );
  console.log(result);
}

firewallRuleDelete().catch(console.error);
