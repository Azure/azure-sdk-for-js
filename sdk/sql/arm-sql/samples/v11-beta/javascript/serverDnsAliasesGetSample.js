// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a server DNS alias.
 *
 * @summary Gets a server DNS alias.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ServerDnsAliasGet.json
 */
async function getServerDnsAlias() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const serverName = "dns-alias-server";
  const dnsAliasName = "dns-alias-name-1";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverDnsAliases.get(resourceGroupName, serverName, dnsAliasName);
  console.log(result);
}

async function main() {
  await getServerDnsAlias();
}

main().catch(console.error);
