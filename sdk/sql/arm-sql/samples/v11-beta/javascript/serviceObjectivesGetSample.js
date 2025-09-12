// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a database service objective.
 *
 * @summary Gets a database service objective.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/stable/2014-04-01/examples/ServiceObjectiveGet.json
 */
async function getAServiceObjective() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "sqlcrudtest";
  const serviceObjectiveName = "29dd7459-4a7c-4e56-be22-f0adda49440d";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serviceObjectives.get(
    resourceGroupName,
    serverName,
    serviceObjectiveName,
  );
  console.log(result);
}

async function main() {
  await getAServiceObjective();
}

main().catch(console.error);
