// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a backup policy belonging to a backup vault
 *
 * @summary gets a backup policy belonging to a backup vault
 * x-ms-original-file: 2025-07-01/PolicyCRUD/GetBackupPolicy.json
 */
async function getBackupPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupPolicies.get(
    "000pikumar",
    "PrivatePreviewVault",
    "OSSDBPolicy",
  );
  console.log(result);
}

async function main() {
  await getBackupPolicy();
}

main().catch(console.error);
