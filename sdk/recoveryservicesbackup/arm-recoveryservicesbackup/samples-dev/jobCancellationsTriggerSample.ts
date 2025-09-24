// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Cancels a job. This is an asynchronous operation. To know the status of the cancellation, call
GetCancelOperationResult API.
 *
 * @summary Cancels a job. This is an asynchronous operation. To know the status of the cancellation, call
GetCancelOperationResult API.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/Common/TriggerCancelJob.json
 */

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cancelJob(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "NetSDKTestRsVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "SwaggerTestRg";
  const jobName = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.jobCancellations.trigger(
    vaultName,
    resourceGroupName,
    jobName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cancelJob();
}

main().catch(console.error);
