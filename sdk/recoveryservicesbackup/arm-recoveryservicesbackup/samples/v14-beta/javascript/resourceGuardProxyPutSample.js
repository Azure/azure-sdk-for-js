// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to add or Update ResourceGuardProxy under vault
 * Secures vault critical operations
 *
 * @summary add or Update ResourceGuardProxy under vault
 * Secures vault critical operations
 * x-ms-original-file: 2026-01-01-preview/ResourceGuardProxyCRUD/PutResourceGuardProxy.json
 */
async function createResourceGuardProxy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.resourceGuardProxy.put(
    "sampleVault",
    "SampleResourceGroup",
    "swaggerExample",
    {
      properties: {
        resourceGuardResourceId:
          "/subscriptions/c999d45b-944f-418c-a0d8-c3fcfd1802c8/resourceGroups/vaultguardRGNew/providers/Microsoft.DataProtection/resourceGuards/VaultGuardTestNew",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createResourceGuardProxy();
}

main().catch(console.error);
