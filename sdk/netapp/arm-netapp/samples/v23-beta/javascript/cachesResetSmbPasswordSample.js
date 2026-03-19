// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resets the SMB password for the cache
 *
 * @summary resets the SMB password for the cache
 * x-ms-original-file: 2025-12-15-preview/Caches_ResetSmbPassword.json
 */
async function cachesResetSmbPassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.caches.resetSmbPassword("myResourceGroup", "account1", "pool1", "cache1");
}

async function main() {
  await cachesResetSmbPassword();
}

main().catch(console.error);
