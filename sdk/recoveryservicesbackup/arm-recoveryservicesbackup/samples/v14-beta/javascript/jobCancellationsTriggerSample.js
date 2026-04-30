// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels a job. This is an asynchronous operation. To know the status of the cancellation, call
 * GetCancelOperationResult API.
 *
 * @summary cancels a job. This is an asynchronous operation. To know the status of the cancellation, call
 * GetCancelOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/Common/TriggerCancelJob.json
 */
async function cancelJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.jobCancellations.trigger(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "00000000-0000-0000-0000-000000000000",
  );
}

async function main() {
  await cancelJob();
}

main().catch(console.error);
