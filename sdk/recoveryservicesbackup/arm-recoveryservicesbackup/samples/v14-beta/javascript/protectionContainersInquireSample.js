// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this is an async operation and the results should be tracked using location header or Azure-async-url.
 *
 * @summary this is an async operation and the results should be tracked using location header or Azure-async-url.
 * x-ms-original-file: 2026-01-01-preview/AzureStorage/ProtectionContainers_Inquire.json
 */
async function inquireAzureStorageProtectionContainers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.protectionContainers.inquire(
    "testvault",
    "test-rg",
    "Azure",
    "storagecontainer;Storage;test-rg;teststorage",
  );
}

async function main() {
  await inquireAzureStorageProtectionContainers();
}

main().catch(console.error);
