// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check the specified namespace name availability.
 *
 * @summary check the specified namespace name availability.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceCheckNameAvailability.json
 */
async function relayCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability({
    name: "example-RelayNamespace1321",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await relayCheckNameAvailability();
}

main().catch(console.error);
