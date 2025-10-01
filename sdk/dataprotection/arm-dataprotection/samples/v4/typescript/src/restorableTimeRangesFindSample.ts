// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to
 *
 * @summary
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/FindRestorableTimeRanges.json
 */
async function findRestorableTimeRanges(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.restorableTimeRanges.find(
    "Blob-Backup",
    "ZBlobBackupVaultBVTD3",
    "zblobbackuptestsa58",
    {
      endTime: "2021-02-24T00:35:17.6829685Z",
      sourceDataStoreType: "OperationalStore",
      startTime: "2020-10-17T23:28:17.6829685Z",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await findRestorableTimeRanges();
}

main().catch(console.error);
