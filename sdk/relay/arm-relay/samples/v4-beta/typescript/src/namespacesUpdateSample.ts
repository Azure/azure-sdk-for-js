// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @summary creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceUpdate.json
 */
async function relayNameSpaceUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.namespaces.update("RG-eg", "example-RelayRelayNamespace-01", {
    tags: { tag3: "value3", tag4: "value4", tag5: "value5", tag6: "value6" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await relayNameSpaceUpdate();
}

main().catch(console.error);
