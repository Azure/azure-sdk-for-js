// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Triggers export of jobs specified by filters and returns an OperationID to track.
 *
 * @summary Triggers export of jobs specified by filters and returns an OperationID to track.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/Common/TriggerExportJobs.json
 */

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function exportJobs(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "NetSDKTestRsVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "SwaggerTestRg";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.jobs.export(vaultName, resourceGroupName);
  console.log(result);
}

async function main(): Promise<void> {
  await exportJobs();
}

main().catch(console.error);
