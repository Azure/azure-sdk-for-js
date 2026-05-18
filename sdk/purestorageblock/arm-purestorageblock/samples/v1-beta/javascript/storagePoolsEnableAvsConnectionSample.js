// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to initiate a connection between the storage pool and a specified AVS SDDC resource
 *
 * @summary initiate a connection between the storage pool and a specified AVS SDDC resource
 * x-ms-original-file: 2026-01-01-preview/StoragePools_EnableAvsConnection_MaximumSet_Gen.json
 */
async function storagePoolsEnableAvsConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.storagePools.enableAvsConnection("rgpurestorage", "storagepool-01", {
    clusterResourceId: "tghkgktlddwlszbeh",
  });
}

async function main() {
  await storagePoolsEnableAvsConnection();
}

main().catch(console.error);
