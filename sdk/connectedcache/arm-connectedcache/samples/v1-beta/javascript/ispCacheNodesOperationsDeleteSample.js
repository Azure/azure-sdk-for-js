// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedCacheClient } = require("@azure/arm-connectedcache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this api deletes an existing ispCacheNode resource
 *
 * @summary this api deletes an existing ispCacheNode resource
 * x-ms-original-file: 2023-05-01-preview/IspCacheNodesOperations_Delete_MaximumSet_Gen.json
 */
async function ispCacheNodesDeleteOperationGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  await client.ispCacheNodesOperations.delete(
    "rgConnectedCache",
    "lvpcosvbfxtpzscakewx",
    "wsiruvexelltpbouqxvsogqpxdizcwqwfowybncvjunlakjwcpgmqbdbgzjrsmxlkczxnsxfonhnqqa",
  );
}

async function main() {
  ispCacheNodesDeleteOperationGeneratedByMaximumSetRule();
}

main().catch(console.error);
