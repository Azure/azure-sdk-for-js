// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a specific backup, given its name.
 *
 * @summary deletes a specific backup, given its name.
 * x-ms-original-file: 2026-01-01-preview/BackupsAutomaticAndOnDemandDelete.json
 */
async function deleteAnOnDemandBackupGivenItsName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.backupsAutomaticAndOnDemand.delete(
    "exampleresourcegroup",
    "exampleserver",
    "ondemandbackup-20250601T183022",
  );
}

async function main() {
  await deleteAnOnDemandBackupGivenItsName();
}

main().catch(console.error);
