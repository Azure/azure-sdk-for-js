// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a list of Recovery Points for a DataSource in a vault.
 *
 * @summary returns a list of Recovery Points for a DataSource in a vault.
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/ListRecoveryPoints.json
 */
async function listRecoveryPointsInAVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recoveryPoints.list(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRecoveryPointsInAVault();
}

main().catch(console.error);
