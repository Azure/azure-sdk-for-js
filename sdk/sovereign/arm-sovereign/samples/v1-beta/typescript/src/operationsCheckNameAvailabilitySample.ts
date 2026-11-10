// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-sovereign";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements global CheckNameAvailability operations
 *
 * @summary implements global CheckNameAvailability operations
 * x-ms-original-file: 2026-10-31-preview/Operations_CheckNameAvailability.json
 */
async function operationsCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ecb23b6b-b38a-42c7-b8ea-01a4aad4483a";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.operations.checkNameAvailability({
    name: "name1",
    type: "Microsoft.Sovereign/sovereignViews",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await operationsCheckNameAvailability();
}

main().catch(console.error);
