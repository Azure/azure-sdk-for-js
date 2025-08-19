// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a outbound firewall rule with a given name.
 *
 * @summary Deletes a outbound firewall rule with a given name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-02-01-preview/examples/OutboundFirewallRuleDelete.json
 */

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deletesAOutboundFirewallRuleWithAGivenName(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const serverName = "sqlcrudtest-6661";
  const outboundRuleFqdn = "server.database.windows.net";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.outboundFirewallRules.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    outboundRuleFqdn,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deletesAOutboundFirewallRuleWithAGivenName();
}

main().catch(console.error);
