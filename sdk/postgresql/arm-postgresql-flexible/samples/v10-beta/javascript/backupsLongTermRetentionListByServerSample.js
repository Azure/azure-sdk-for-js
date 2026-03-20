// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the results of the long term retention backup operations for a server.
 *
 * @summary lists the results of the long term retention backup operations for a server.
 * x-ms-original-file: 2026-01-01-preview/BackupsLongTermRetentionListByServer.json
 */
async function listTheResultsOfTheLongTermRetentionBackupOperationsForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupsLongTermRetention.listByServer(
    "exampleresourcegroup",
    "exampleserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheResultsOfTheLongTermRetentionBackupOperationsForAServer();
}

main().catch(console.error);
