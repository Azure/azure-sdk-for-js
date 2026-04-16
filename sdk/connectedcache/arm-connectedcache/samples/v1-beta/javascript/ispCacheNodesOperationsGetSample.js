// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedCacheClient } = require("@azure/arm-connectedcache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this api gets ispCacheNode resource information
 *
 * @summary this api gets ispCacheNode resource information
 * x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_Get_MaximumSet_Gen.json
 */
async function ispCacheNodesGetResourceGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.ispCacheNodesOperations.get(
    "rgConnectedCache",
    "sgtqjsitdrskmgyrrkntszwrrjjkretscpjgaezraucvcwececlelcsorfunrnvxyxcsrg",
    "lbsziwmudcjnwnwy",
  );
  console.log(result);
}

async function main() {
  await ispCacheNodesGetResourceGeneratedByMaximumSetRule();
}

main().catch(console.error);
