// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to retrieves the properties of a cacheNodes
 *
 * @summary retrieves the properties of a cacheNodes
 * x-ms-original-file: 2023-05-01-preview/CacheNodesOperations_Get_MaximumSet_Gen.json
 */

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

async function cacheNodesOperationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.cacheNodesOperations.get(
    "rgConnectedCache",
    "nqoxkgorhuzbhjwcegymzqbeydzjupemekt",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cacheNodesOperationsGet();
}

main().catch(console.error);
