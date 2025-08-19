// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a cluster firewall rule.
 *
 * @summary Deletes a cluster firewall rule.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/FirewallRuleDelete.json
 */
async function deleteTheFirewallRuleOfTheCluster(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "pgtestsvc4";
  const firewallRuleName = "rule1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.firewallRules.beginDeleteAndWait(
    resourceGroupName,
    clusterName,
    firewallRuleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteTheFirewallRuleOfTheCluster();
}

main().catch(console.error);
