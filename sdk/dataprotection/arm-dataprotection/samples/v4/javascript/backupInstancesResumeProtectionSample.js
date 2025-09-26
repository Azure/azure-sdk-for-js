// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation will resume protection for a stopped backup instance
 *
 * @summary this operation will resume protection for a stopped backup instance
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/ResumeProtection.json
 */
async function resumeProtection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupInstances.resumeProtection("testrg", "testvault", "testbi");
}

async function main() {
  await resumeProtection();
}

main().catch(console.error);
