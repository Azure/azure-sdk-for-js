// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation for Acceptor to view the accepted request
 *
 * @summary the operation for Acceptor to view the accepted request
 * x-ms-original-file: 2025-11-01-preview/targetDirectoryStatus.json
 */
async function targetDirectoryStatus() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptions.targetDirectoryStatus(
    "e1084a54-27ab-4b72-a3ba-89fac9548f49",
  );
  console.log(result);
}

async function main() {
  await targetDirectoryStatus();
}

main().catch(console.error);
