// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the results of a long retention backup operation for a server.
 *
 * @summary gets the results of a long retention backup operation for a server.
 * x-ms-original-file: 2026-01-01-preview/BackupsLongTermRetentionGet.json
 */
async function getTheResultsOfALongRetentionBackupOperationForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupsLongTermRetention.get(
    "exampleresourcegroup",
    "exampleserver",
    "exampleltrbackup",
  );
  console.log(result);
}

async function main() {
  await getTheResultsOfALongRetentionBackupOperationForAServer();
}

main().catch(console.error);
