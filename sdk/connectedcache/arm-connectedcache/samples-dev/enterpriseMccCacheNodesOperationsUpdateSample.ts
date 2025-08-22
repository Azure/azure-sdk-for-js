// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to this api updates an existing ispCacheNode resource
 *
 * @summary this api updates an existing ispCacheNode resource
 * x-ms-original-file: 2023-05-01-preview/EnterpriseMccCacheNodesOperations_Update_MaximumSet_Gen.json
 */

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

async function enterpriseMccCacheNodesOperationsUpdateGeneratedByMaximumSetRule(): Promise<void> {
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

async function main(): Promise<void> {
  await enterpriseMccCacheNodesOperationsUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
