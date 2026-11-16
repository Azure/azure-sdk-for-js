// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-sovereign";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements local CheckNameAvailability operations
 *
 * @summary implements local CheckNameAvailability operations
 * x-ms-original-file: 2026-10-31-preview/Operations_CheckNameAvailabilityLocal.json
 */
async function operationsCheckNameAvailabilityLocal(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ecb23b6b-b38a-42c7-b8ea-01a4aad4483a";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.operations.checkNameAvailabilityLocal("northeurope", {
    name: "name1",
    type: "Microsoft.Sovereign/sovereignViews",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await operationsCheckNameAvailabilityLocal();
}

main().catch(console.error);
