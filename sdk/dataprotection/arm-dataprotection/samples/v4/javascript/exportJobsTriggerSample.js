// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers export of jobs and returns an OperationID to track.
 *
 * @summary triggers export of jobs and returns an OperationID to track.
 * x-ms-original-file: 2025-07-01/JobCRUD/TriggerExportJobs.json
 */
async function triggerExportJobs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.exportJobs.trigger("SwaggerTestRg", "NetSDKTestRsVault");
}

async function main() {
  await triggerExportJobs();
}

main().catch(console.error);
