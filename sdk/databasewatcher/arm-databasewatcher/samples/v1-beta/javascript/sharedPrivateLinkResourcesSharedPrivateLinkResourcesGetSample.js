// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DatabaseWatcherClient } = require("@azure/arm-databasewatcher");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SharedPrivateLinkResource
 *
 * @summary get a SharedPrivateLinkResource
 * x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_Get_MaximumSet_Gen.json
 */
async function sharedPrivateLinkResourcesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "49e0fbd3-75e8-44e7-96fd-5b64d9ad818d";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const result = await client.sharedPrivateLinkResources.get(
    "apiTest-ddat4p",
    "databasemo3ej9ih",
    "monitoringh22eed",
  );
  console.log(result);
}

async function main() {
  await sharedPrivateLinkResourcesGetMaximumSet();
}

main().catch(console.error);
