// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve health metrics of a storage pool
 *
 * @summary retrieve health metrics of a storage pool
 * x-ms-original-file: 2024-11-01/StoragePools_GetHealthStatus_MaximumSet_Gen.json
 */
async function storagePoolsGetHealthStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.getHealthStatus("rgpurestorage", "storagePoolname");
  console.log(result);
}

async function main() {
  await storagePoolsGetHealthStatus();
}

main().catch(console.error);
