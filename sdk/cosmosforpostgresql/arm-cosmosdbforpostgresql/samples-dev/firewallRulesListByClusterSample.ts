// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the firewall rules on cluster.
 *
 * @summary Lists all the firewall rules on cluster.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/FirewallRuleListByCluster.json
 */

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listFirewallRulesOfTheCluster(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "pgtestsvc4";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallRules.listByCluster(resourceGroupName, clusterName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listFirewallRulesOfTheCluster();
}

main().catch(console.error);
