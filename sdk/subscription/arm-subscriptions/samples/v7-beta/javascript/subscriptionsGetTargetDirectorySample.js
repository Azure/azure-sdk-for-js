// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to view Initiator Subscription Changed Request
 *
 * @summary the operation to view Initiator Subscription Changed Request
 * x-ms-original-file: 2025-11-01-preview/getTargetDirectory.json
 */
async function getTargetDirectory() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptions.getTargetDirectory(
    "ebe4f8fd-d8b3-4867-bcf4-b2407edd196d",
  );
  console.log(result);
}

async function main() {
  await getTargetDirectory();
}

main().catch(console.error);
