// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the firewall rules on cluster.
 *
 * @summary lists all the firewall rules on cluster.
 * x-ms-original-file: 2023-03-02-preview/FirewallRuleListByCluster.json
 */
async function listFirewallRulesOfTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallRules.listByCluster("TestGroup", "pgtestsvc4")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFirewallRulesOfTheCluster();
}

main().catch(console.error);
