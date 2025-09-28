// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation will stop protection of a backup instance and data will be held forever
 *
 * @summary this operation will stop protection of a backup instance and data will be held forever
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/StopProtection.json
 */
async function stopProtection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupInstances.stopProtection("testrg", "testvault", "testbi");
}

/**
 * This sample demonstrates how to this operation will stop protection of a backup instance and data will be held forever
 *
 * @summary this operation will stop protection of a backup instance and data will be held forever
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/StopProtection_ResourceGuardEnabled.json
 */
async function stopProtectionWithMUA() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupInstances.stopProtection("testrg", "testvault", "testbi", {
    parameters: {
      resourceGuardOperationRequests: [
        "/subscriptions/754ec39f-8d2a-44cf-bfbf-13107ac85c36/resourcegroups/mua-testing/providers/Microsoft.DataProtection/resourceGuards/gvjreddy-test-ecy-rg-reader/dppDisableStopProtectionRequests/default",
      ],
    },
  });
}

async function main() {
  await stopProtection();
  await stopProtectionWithMUA();
}

main().catch(console.error);
