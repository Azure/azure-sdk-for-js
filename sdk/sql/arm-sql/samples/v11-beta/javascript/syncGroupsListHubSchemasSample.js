// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a collection of hub database schemas.
 *
 * @summary gets a collection of hub database schemas.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupGetHubSchema.json
 */
async function getAHubDatabaseSchema() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.syncGroups.listHubSchemas(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAHubDatabaseSchema();
}

main().catch(console.error);
