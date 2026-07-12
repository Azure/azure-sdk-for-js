// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to accept Subscription Changed Request
 *
 * @summary the operation to accept Subscription Changed Request
 * x-ms-original-file: 2025-11-01-preview/acceptTargetDirectory.json
 */
async function acceptTargetDirectory() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  await client.subscriptions.acceptTargetDirectory("6c3c85bc-5366-4eaa-8055-a10529eafd03");
}

async function main() {
  await acceptTargetDirectory();
}

main().catch(console.error);
