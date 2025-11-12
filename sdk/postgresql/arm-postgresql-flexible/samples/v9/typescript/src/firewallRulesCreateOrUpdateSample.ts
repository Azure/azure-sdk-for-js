// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FirewallRule} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new firewall rule or updates an existing firewall rule.
 *
 * @summary Creates a new firewall rule or updates an existing firewall rule.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/FirewallRulesCreateOrUpdate.json
 */
async function createANewFirewallRuleOrUpdateAnExistingFirewallRule(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const firewallRuleName = "examplefirewallrule";
  const parameters: FirewallRule = {
    endIpAddress: "255.255.255.255",
    startIpAddress: "0.0.0.0",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.firewallRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    firewallRuleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createANewFirewallRuleOrUpdateAnExistingFirewallRule();
}

main().catch(console.error);
