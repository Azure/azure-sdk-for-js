// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of servers in a resource groups.
 *
 * @summary Gets a list of servers in a resource groups.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/ServerListByResourceGroup.json
 */
async function listServersByResourceGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servers.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets a list of servers in a resource groups.
 *
 * @summary Gets a list of servers in a resource groups.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/ServerListByResourceGroupWithExpandEqualsAdministrators.json
 */
async function listServersByResourceGroupWithExpandAdministratorsOrActivedirectory() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servers.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listServersByResourceGroup();
  await listServersByResourceGroupWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
