// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a service hybrid connection. This operation is idempotent.
 *
 * @summary creates or updates a service hybrid connection. This operation is idempotent.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionCreate.json
 */
async function relayHybridConnectionCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.hybridConnections.createOrUpdate(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-Hybrid-01",
    { properties: { requiresClientAuthorization: true } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await relayHybridConnectionCreate();
}

main().catch(console.error);
