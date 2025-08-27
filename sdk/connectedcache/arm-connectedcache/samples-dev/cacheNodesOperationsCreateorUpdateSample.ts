// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to creates a cacheNodes with the specified create parameters
 *
 * @summary creates a cacheNodes with the specified create parameters
 * x-ms-original-file: 2023-05-01-preview/CacheNodesOperations_CreateorUpdate_MaximumSet_Gen.json
 */

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

async function cacheNodesOperationsCreateorUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.cacheNodesOperations.createorUpdate(
    "rgConnectedCache",
    "lwrsyhvfpcfrwrim",
    {
      location: "westus",
      properties: {
        statusCode: "movtzupooyhdqk",
        statusText: "bjnsrpzaofjntleoesjwammgbi",
        statusDetails: "quuziibkwtgf",
        error: {},
      },
      tags: { key8256: "oreqiywrjkmate" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cacheNodesOperationsCreateorUpdate();
}

main().catch(console.error);
