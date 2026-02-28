// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns ResourceGuardProxy under vault and with the name referenced in request
 *
 * @summary returns ResourceGuardProxy under vault and with the name referenced in request
 * x-ms-original-file: 2026-01-01-preview/ResourceGuardProxyCRUD/GetResourceGuardProxy.json
 */
async function getResourceGuardProxy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.resourceGuardProxy.get(
    "sampleVault",
    "SampleResourceGroup",
    "swaggerExample",
  );
  console.log(result);
}

async function main() {
  await getResourceGuardProxy();
}

main().catch(console.error);
