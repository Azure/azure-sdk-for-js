// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedCacheClient } = require("@azure/arm-connectedcache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this api updates an existing ispCacheNode resource
 *
 * @summary this api updates an existing ispCacheNode resource
 * x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_Update_MaximumSet_Gen.json
 */
async function enterpriseMccCacheNodesOperationsUpdateGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.enterpriseMccCacheNodesOperations.update(
    "rgConnectedCache",
    "qanjqtvrxzjkljdysdjvdiqcxkttskpdzykzuefhbhz",
    "kllmlvazrcxmfjfozulzqnsgvspgwmhogcafvauchunlgfr",
    { tags: { key1653: "nzjczrhclhkndesgy" } },
  );
  console.log(result);
}

async function main() {
  await enterpriseMccCacheNodesOperationsUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
