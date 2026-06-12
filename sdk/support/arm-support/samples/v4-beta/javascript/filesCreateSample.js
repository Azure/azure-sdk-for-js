// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new file under a workspace for the specified subscription.
 *
 * @summary creates a new file under a workspace for the specified subscription.
 * x-ms-original-file: 2025-06-01-preview/CreateFileForSubscription.json
 */
async function createAFileUnderASubscriptionWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.files.create("testworkspace", "test.txt", {
    chunkSize: 41423,
    fileSize: 41423,
    numberOfChunks: 1,
  });
  console.log(result);
}

async function main() {
  await createAFileUnderASubscriptionWorkspace();
}

main().catch(console.error);
