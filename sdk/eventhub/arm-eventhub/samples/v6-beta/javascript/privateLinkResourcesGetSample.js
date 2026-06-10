// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets lists of resources that supports Privatelinks.
 *
 * @summary gets lists of resources that supports Privatelinks.
 * x-ms-original-file: 2026-01-01/NameSpaces/PrivateLinkResourcesGet.json
 */
async function nameSpacePrivateLinkResourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subID";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get("ArunMonocle", "sdk-Namespace-2924");
  console.log(result);
}

async function main() {
  await nameSpacePrivateLinkResourcesGet();
}

main().catch(console.error);
