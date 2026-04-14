// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides a pageable list of workload item of a specific container according to the query filter and the pagination
 * parameters.
 *
 * @summary provides a pageable list of workload item of a specific container according to the query filter and the pagination
 * parameters.
 * x-ms-original-file: 2026-01-01-preview/AzureWorkload/BackupWorkloadItems_List.json
 */
async function listWorkloadItemsInContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupWorkloadItems.list(
    "suchandr-seacan-rsv",
    "testRg",
    "Azure",
    "VMAppContainer;Compute;bvtdtestag;sqlserver-1",
    { filter: "backupManagementType eq 'AzureWorkload'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkloadItemsInContainer();
}

main().catch(console.error);
