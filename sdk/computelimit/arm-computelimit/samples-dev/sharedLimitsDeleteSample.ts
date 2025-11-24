// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables sharing of a compute limit by the host subscription with its guest subscriptions.
 *
 * @summary disables sharing of a compute limit by the host subscription with its guest subscriptions.
 * x-ms-original-file: 2025-08-15/SharedLimits_Delete.json
 */
async function deleteASharedLimit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  await client.sharedLimits.delete("eastus", "StandardDSv3Family");
}

async function main(): Promise<void> {
  await deleteASharedLimit();
}

main().catch(console.error);
