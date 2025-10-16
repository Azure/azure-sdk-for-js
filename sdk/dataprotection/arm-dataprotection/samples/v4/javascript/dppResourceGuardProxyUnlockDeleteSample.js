// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unlockDelete call for ResourceGuardProxy, executed before one can delete it
 *
 * @summary unlockDelete call for ResourceGuardProxy, executed before one can delete it
 * x-ms-original-file: 2025-07-01/ResourceGuardProxyCRUD/UnlockDeleteResourceGuardProxy.json
 */
async function unlockDeleteResourceGuardProxy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5e13b949-1218-4d18-8b99-7e12155ec4f7";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.dppResourceGuardProxy.unlockDelete(
    "SampleResourceGroup",
    "sampleVault",
    "swaggerExample",
    {
      resourceGuardOperationRequests: [
        "/subscriptions/f9e67185-f313-4e79-aa71-6458d429369d/resourceGroups/ResourceGuardSecurityAdminRG/providers/Microsoft.DataProtection/resourceGuards/ResourceGuardTestResource/deleteBackupInstanceRequests/default",
      ],
      resourceToBeDeleted:
        "/subscriptions/5e13b949-1218-4d18-8b99-7e12155ec4f7/resourceGroups/SampleResourceGroup/providers/Microsoft.DataProtection/backupVaults/sampleVault/backupInstances/TestBI9779f4de",
    },
  );
  console.log(result);
}

async function main() {
  await unlockDeleteResourceGuardProxy();
}

main().catch(console.error);
