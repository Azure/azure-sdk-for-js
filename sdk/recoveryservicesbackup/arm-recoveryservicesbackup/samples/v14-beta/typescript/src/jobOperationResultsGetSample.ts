// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the result of any operation.
 *
 * @summary fetches the result of any operation.
 * x-ms-original-file: 2026-01-01-preview/Common/CancelJobOperationResult.json
 */
async function cancelJobOperationResult(): Promise<void> {
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

async function main(): Promise<void> {
  await cancelJobOperationResult();
}

main().catch(console.error);
