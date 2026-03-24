// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to view Initiator Subscription Changed Request
 *
 * @summary the operation to view Initiator Subscription Changed Request
 * x-ms-original-file: 2025-11-01-preview/getTargetDirectory.json
 */
async function getTargetDirectory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptions.getTargetDirectory(
    "ebe4f8fd-d8b3-4867-bcf4-b2407edd196d",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTargetDirectory();
}

main().catch(console.error);
