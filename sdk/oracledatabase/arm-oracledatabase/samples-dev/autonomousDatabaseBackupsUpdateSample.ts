// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a AutonomousDatabaseBackup
 *
 * @summary update a AutonomousDatabaseBackup
 * x-ms-original-file: 2025-03-01/autonomousDatabaseBackup_patch.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

async function autonomousDatabaseBackupsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseBackups.update(
    "rg000",
    "databasedb1",
    "1711644130",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await autonomousDatabaseBackupsUpdate();
}

main().catch(console.error);
