// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unregisters the given container from your Recovery Services Vault. This is an asynchronous operation. To determine
 * whether the backend service has finished processing the request, call Get Container Operation Result API.
 *
 * @summary unregisters the given container from your Recovery Services Vault. This is an asynchronous operation. To determine
 * whether the backend service has finished processing the request, call Get Container Operation Result API.
 * x-ms-original-file: 2026-01-01-preview/AzureWorkload/ProtectionContainers_Unregister.json
 */
async function unregisterProtectionContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.protectionContainers.unregister(
    "testVault",
    "testRg",
    "Azure",
    "storagecontainer;Storage;test-rg;teststorage",
  );
}

async function main() {
  await unregisterProtectionContainer();
}

main().catch(console.error);
