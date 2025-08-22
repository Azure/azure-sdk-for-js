// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a Recovery Point using recoveryPointId for a Datasource.
 *
 * @summary Gets a Recovery Point using recoveryPointId for a Datasource.
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/BackupInstanceOperations/GetRecoveryPoint.json
 */

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getRecoveryPoint(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "000pikumar";
  const vaultName = "PratikPrivatePreviewVault1";
  const backupInstanceName = "testInstance1";
  const recoveryPointId = "7fb2cddd-c5b3-44f6-a0d9-db3c4f9d5f25";
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.recoveryPoints.get(
    resourceGroupName,
    vaultName,
    backupInstanceName,
    recoveryPointId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRecoveryPoint();
}

main().catch(console.error);
