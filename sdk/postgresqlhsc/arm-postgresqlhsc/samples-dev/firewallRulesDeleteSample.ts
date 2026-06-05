// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a cluster firewall rule.
 *
 * @summary deletes a cluster firewall rule.
 * x-ms-original-file: 2023-03-02-preview/FirewallRuleDelete.json
 */
async function deleteTheFirewallRuleOfTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  await client.firewallRules.delete("TestGroup", "pgtestsvc4", "rule1");
}

async function main(): Promise<void> {
  await deleteTheFirewallRuleOfTheCluster();
}

main().catch(console.error);
