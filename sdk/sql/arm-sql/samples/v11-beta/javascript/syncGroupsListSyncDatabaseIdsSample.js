// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a collection of sync database ids.
 *
 * @summary Gets a collection of sync database ids.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/SyncGroupGetSyncDatabaseId.json
 */
async function getASyncDatabaseId() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const locationName = "westus";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.syncGroups.listSyncDatabaseIds(locationName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getASyncDatabaseId();
}

main().catch(console.error);
