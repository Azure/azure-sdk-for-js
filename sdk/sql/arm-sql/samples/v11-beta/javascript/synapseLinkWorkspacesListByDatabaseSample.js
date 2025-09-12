// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all synapselink workspaces for a database.
 *
 * @summary Gets all synapselink workspaces for a database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-05-01-preview/examples/SynapseLinkWorkspaceListByDatabase.json
 */
async function listAllSynapselinkWorkspacesForTheGivenDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "dbSynapse";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.synapseLinkWorkspaces.listByDatabase(
    resourceGroupName,
    serverName,
    databaseName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAllSynapselinkWorkspacesForTheGivenDatabase();
}

main().catch(console.error);
