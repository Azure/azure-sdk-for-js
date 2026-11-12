// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to configure authentication settings for platform console access to the storage pool
 *
 * @summary configure authentication settings for platform console access to the storage pool
 * x-ms-original-file: 2026-05-01-preview/StoragePools_ConfigurePlatformConsoleAuth_MaximumSet_Gen.json
 */
async function storagePoolsConfigurePlatformConsoleAuth() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.configurePlatformConsoleAuth(
    "rgpurestorage",
    "storagepool-01",
    {
      authType: "ssh",
      username: "alice",
      publicKey:
        "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl alice@example.com",
      role: "storage_admin",
    },
  );
  console.log(result);
}

async function main() {
  await storagePoolsConfigurePlatformConsoleAuth();
}

main().catch(console.error);
