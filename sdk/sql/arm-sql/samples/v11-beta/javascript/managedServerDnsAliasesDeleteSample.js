// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the managed server DNS alias with the given name.
 *
 * @summary Deletes the managed server DNS alias with the given name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/ManagedServerDnsAliasDelete.json
 */
async function deleteManagedServerDnsAlias() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const managedInstanceName = "dns-mi";
  const dnsAliasName = "dns-alias-mi";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedServerDnsAliases.beginDeleteAndWait(
    resourceGroupName,
    managedInstanceName,
    dnsAliasName,
  );
  console.log(result);
}

async function main() {
  await deleteManagedServerDnsAlias();
}

main().catch(console.error);
