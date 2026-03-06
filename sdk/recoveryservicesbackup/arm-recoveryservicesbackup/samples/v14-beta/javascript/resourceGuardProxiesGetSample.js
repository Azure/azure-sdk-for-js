// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the ResourceGuardProxies under vault
 *
 * @summary list the ResourceGuardProxies under vault
 * x-ms-original-file: 2026-01-01-preview/ResourceGuardProxyCRUD/ListResourceGuardProxy.json
 */
async function getVaultGuardProxies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceGuardProxies.get("sampleVault", "SampleResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getVaultGuardProxies();
}

main().catch(console.error);
