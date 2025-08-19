// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about a cluster firewall rule.
 *
 * @summary Gets information about a cluster firewall rule.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/FirewallRuleGet.json
 */

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getTheFirewallRuleOfTheCluster(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "pgtestsvc4";
  const firewallRuleName = "rule1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.firewallRules.get(resourceGroupName, clusterName, firewallRuleName);
  console.log(result);
}

async function main(): Promise<void> {
  await getTheFirewallRuleOfTheCluster();
}

main().catch(console.error);
