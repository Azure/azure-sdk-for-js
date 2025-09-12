// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a managed server DNS alias.
 *
 * @summary Creates a managed server DNS alias.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/ManagedServerDnsAliasCreateOrUpdate.json
 */
async function createManagedServerDnsAlias() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const managedInstanceName = "dns-mi";
  const dnsAliasName = "dns-alias-mi";
  const parameters = {};
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedServerDnsAliases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    dnsAliasName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createManagedServerDnsAlias();
}

main().catch(console.error);
