// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to backup management servers registered to Recovery Services Vault. Returns a pageable list of servers.
 *
 * @summary backup management servers registered to Recovery Services Vault. Returns a pageable list of servers.
 * x-ms-original-file: 2026-01-01-preview/Dpm/BackupEngines_List.json
 */
async function listDpmOrAzureBackupServerOrLajollaBackupEngines(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupEngines.list("testVault", "testRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDpmOrAzureBackupServerOrLajollaBackupEngines();
}

main().catch(console.error);
