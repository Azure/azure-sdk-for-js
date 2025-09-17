// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Acquires managed server DNS alias from another managed server.
 *
 * @summary Acquires managed server DNS alias from another managed server.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/ManagedServerDnsAliasAcquire.json
 */
async function acquireManagedServerDnsAlias() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const managedInstanceName = "new-mi";
  const dnsAliasName = "dns-alias-mi";
  const parameters = {
    oldManagedServerDnsAliasResourceId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/managedInstances/old-mi/dnsAliases/alias1",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedServerDnsAliases.beginAcquireAndWait(
    resourceGroupName,
    managedInstanceName,
    dnsAliasName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await acquireManagedServerDnsAlias();
}

main().catch(console.error);
