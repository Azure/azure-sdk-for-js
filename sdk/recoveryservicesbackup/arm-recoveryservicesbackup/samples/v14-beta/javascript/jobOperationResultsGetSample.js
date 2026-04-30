// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches the result of any operation.
 *
 * @summary fetches the result of any operation.
 * x-ms-original-file: 2026-01-01-preview/Common/CancelJobOperationResult.json
 */
async function cancelJobOperationResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.jobOperationResults.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "00000000-0000-0000-0000-000000000000",
    "00000000-0000-0000-0000-000000000000",
  );
}

async function main() {
  await cancelJobOperationResult();
}

main().catch(console.error);
