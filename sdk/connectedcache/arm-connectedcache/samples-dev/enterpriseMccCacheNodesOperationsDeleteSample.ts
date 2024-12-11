// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this api deletes an existing ispCacheNode resource
 *
 * @summary this api deletes an existing ispCacheNode resource
 * x-ms-original-file: 2023-05-01-preview/EnterpriseMccCacheNodesOperations_Delete_MaximumSet_Gen.json
 */
async function enterpriseMccCacheNodesOperationsDeleteOperationGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  await client.enterpriseMccCacheNodesOperations.delete(
    "rgConnectedCache",
    "hsincngmssuzeyispnufqwinpopadvhsbsemisguxgovwdjwviqexocelijvuyr",
    "vwtrhdoxvkrunpliwcao",
  );
}

async function main() {
  enterpriseMccCacheNodesOperationsDeleteOperationGeneratedByMaximumSetRule();
}

main().catch(console.error);
