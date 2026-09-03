// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to list Initiator Subscription Changed Request
 *
 * @summary the operation to list Initiator Subscription Changed Request
 * x-ms-original-file: 2025-11-01-preview/listTargetDirectory.json
 */
async function listTargetDirectory() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.subscriptions.listTargetDirectory(
    "ebe4f8fd-d8b3-4867-bcf4-b2407edd196d",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTargetDirectory();
}

main().catch(console.error);
