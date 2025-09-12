// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the failover groups in a location.
 *
 * @summary Lists the failover groups in a location.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-05-01-preview/examples/InstanceFailoverGroupList.json
 */
async function listFailoverGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const locationName = "Japan East";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instanceFailoverGroups.listByLocation(
    resourceGroupName,
    locationName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listFailoverGroup();
}

main().catch(console.error);
