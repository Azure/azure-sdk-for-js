// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete ResourceGuardProxy under vault
 *
 * @summary delete ResourceGuardProxy under vault
 * x-ms-original-file: 2026-01-01-preview/ResourceGuardProxyCRUD/DeleteResourceGuardProxy.json
 */
async function deleteResourceGuardProxy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.resourceGuardProxy.delete("sampleVault", "SampleResourceGroup", "swaggerExample");
}

async function main() {
  await deleteResourceGuardProxy();
}

main().catch(console.error);
