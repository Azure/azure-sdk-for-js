// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables sharing of a compute limit by the host subscription with its guest subscriptions.
 *
 * @summary enables sharing of a compute limit by the host subscription with its guest subscriptions.
 * x-ms-original-file: 2025-08-15/SharedLimits_Create.json
 */
async function createASharedLimit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.sharedLimits.create("eastus", "StandardDSv3Family", {
    properties: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createASharedLimit();
}

main().catch(console.error);
