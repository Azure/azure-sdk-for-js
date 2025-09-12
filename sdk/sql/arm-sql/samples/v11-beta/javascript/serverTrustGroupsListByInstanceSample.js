// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a server trust groups by instance name.
 *
 * @summary Gets a server trust groups by instance name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ServerTrustGroupListByManagedInstance.json
 */
async function listServerTrustGroupsByManagedInstance() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance-1";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverTrustGroups.listByInstance(
    resourceGroupName,
    managedInstanceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listServerTrustGroupsByManagedInstance();
}

main().catch(console.error);
