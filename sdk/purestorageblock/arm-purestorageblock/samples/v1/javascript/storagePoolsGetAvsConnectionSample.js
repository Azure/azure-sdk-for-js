// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns current information about an on-going connection to an AVS instance
 *
 * @summary returns current information about an on-going connection to an AVS instance
 * x-ms-original-file: 2024-11-01/StoragePools_GetAvsConnection_MaximumSet_Gen.json
 */
async function storagePoolsGetAvsConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.getAvsConnection("rgpurestorage", "storagePoolname");
  console.log(result);
}

async function main() {
  await storagePoolsGetAvsConnection();
}

main().catch(console.error);
