// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to accept Subscription Changed Request
 *
 * @summary the operation to accept Subscription Changed Request
 * x-ms-original-file: 2025-11-01-preview/acceptTargetDirectory.json
 */
async function acceptTargetDirectory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  await client.subscriptions.acceptTargetDirectory("6c3c85bc-5366-4eaa-8055-a10529eafd03");
}

async function main(): Promise<void> {
  await acceptTargetDirectory();
}

main().catch(console.error);
