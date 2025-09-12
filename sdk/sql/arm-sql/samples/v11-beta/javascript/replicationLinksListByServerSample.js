// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of replication links.
 *
 * @summary Gets a list of replication links.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/ReplicationLinkListByServer.json
 */
async function listReplicationLinksOnServer() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const serverName = "sourcesvr";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationLinks.listByServer(resourceGroupName, serverName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listReplicationLinksOnServer();
}

main().catch(console.error);
