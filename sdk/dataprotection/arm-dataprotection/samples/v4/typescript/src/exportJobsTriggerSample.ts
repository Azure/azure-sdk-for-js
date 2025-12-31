// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers export of jobs and returns an OperationID to track.
 *
 * @summary triggers export of jobs and returns an OperationID to track.
 * x-ms-original-file: 2025-07-01/JobCRUD/TriggerExportJobs.json
 */
async function triggerExportJobs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.exportJobs.trigger("SwaggerTestRg", "NetSDKTestRsVault");
}

async function main(): Promise<void> {
  await triggerExportJobs();
}

main().catch(console.error);
