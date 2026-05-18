// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns current information about an on-going connection to an AVS instance
 *
 * @summary returns current information about an on-going connection to an AVS instance
 * x-ms-original-file: 2026-01-01-preview/StoragePools_GetAvsConnection_MaximumSet_Gen.json
 */
async function storagePoolsGetAvsConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.getAvsConnection("rgpurestorage", "storagepool-01");
  console.log(result);
}

async function main() {
  await storagePoolsGetAvsConnection();
}

main().catch(console.error);
