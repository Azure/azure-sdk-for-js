// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a cluster firewall rule.
 *
 * @summary gets information about a cluster firewall rule.
 * x-ms-original-file: 2023-03-02-preview/FirewallRuleGet.json
 */
async function getTheFirewallRuleOfTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.firewallRules.get("TestGroup", "pgtestsvc4", "rule1");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheFirewallRuleOfTheCluster();
}

main().catch(console.error);
