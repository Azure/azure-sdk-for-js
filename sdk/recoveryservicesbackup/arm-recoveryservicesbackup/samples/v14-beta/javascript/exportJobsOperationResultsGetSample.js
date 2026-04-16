// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the operation result of operation triggered by Export Jobs API. If the operation is successful, then it also
 * contains URL of a Blob and a SAS key to access the same. The blob contains exported jobs in JSON serialized format.
 *
 * @summary gets the operation result of operation triggered by Export Jobs API. If the operation is successful, then it also
 * contains URL of a Blob and a SAS key to access the same. The blob contains exported jobs in JSON serialized format.
 * x-ms-original-file: 2026-01-01-preview/Common/ExportJobsOperationResult.json
 */
async function exportJobsOperationResults() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.exportJobsOperationResults.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await exportJobsOperationResults();
}

main().catch(console.error);
