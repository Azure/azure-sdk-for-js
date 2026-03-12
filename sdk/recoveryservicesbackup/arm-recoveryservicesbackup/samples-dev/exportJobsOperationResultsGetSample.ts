// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the operation result of operation triggered by Export Jobs API. If the operation is successful, then it also
contains URL of a Blob and a SAS key to access the same. The blob contains exported jobs in JSON serialized format.
 *
 * @summary Gets the operation result of operation triggered by Export Jobs API. If the operation is successful, then it also
contains URL of a Blob and a SAS key to access the same. The blob contains exported jobs in JSON serialized format.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/Common/ExportJobsOperationResult.json
 */

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function exportJobsOperationResults(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "NetSDKTestRsVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "SwaggerTestRg";
  const operationId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.exportJobsOperationResults.get(
    vaultName,
    resourceGroupName,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exportJobsOperationResults();
}

main().catch(console.error);
