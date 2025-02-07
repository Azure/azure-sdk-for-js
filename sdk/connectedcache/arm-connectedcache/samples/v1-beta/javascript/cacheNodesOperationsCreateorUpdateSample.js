// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedCacheClient } = require("@azure/arm-connectedcache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a cacheNodes with the specified create parameters
 *
 * @summary creates a cacheNodes with the specified create parameters
 * x-ms-original-file: 2023-05-01-preview/CacheNodesOperations_CreateorUpdate_MaximumSet_Gen.json
 */
async function cacheNodesOperationsCreateorUpdate() {
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

async function main() {
  cacheNodesOperationsCreateorUpdate();
}

main().catch(console.error);
