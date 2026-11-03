// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete Initiator Subscription Changed Request
 *
 * @summary the operation to delete Initiator Subscription Changed Request
 * x-ms-original-file: 2025-11-01-preview/deleteTargetDirectory.json
 */
async function deleteTargetDirectory() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  await client.subscriptions.deleteTargetDirectory("ebe4f8fd-d8b3-4867-bcf4-b2407edd196d");
}

async function main() {
  await deleteTargetDirectory();
}

main().catch(console.error);
