// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updateRecoveryPoint to update recovery point for given RecoveryPointID.
 *
 * @summary updateRecoveryPoint to update recovery point for given RecoveryPointID.
 * x-ms-original-file: 2026-01-01-preview/Common/RecoveryPoints_Update.json
 */
async function updateAzureVmRecoveryPointDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.recoveryPoints.update(
    "hanasnapshottesting",
    "HanaSnapshotTest",
    "Azure",
    "VMAppContainer;compute;hanasnapshottesting;hana-eacan-2",
    "SAPHanaDatabase;hye;hye",
    "2265668074516978193",
    {
      properties: {
        recoveryPointProperties: { expiryTime: new Date("2025-01-02T00:00:00.0000000Z") },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAzureVmRecoveryPointDetails();
}

main().catch(console.error);
