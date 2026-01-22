// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information of an on demand backup, given its name.
 *
 * @summary gets information of an on demand backup, given its name.
 * x-ms-original-file: 2026-01-01-preview/BackupsAutomaticAndOnDemandGet.json
 */
async function getAnOnDemandBackupGivenItsName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupsAutomaticAndOnDemand.get(
    "exampleresourcegroup",
    "exampleserver",
    "backup_638830782181266873",
  );
  console.log(result);
}

async function main() {
  await getAnOnDemandBackupGivenItsName();
}

main().catch(console.error);
