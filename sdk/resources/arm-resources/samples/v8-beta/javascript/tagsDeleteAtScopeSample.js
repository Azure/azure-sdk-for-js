// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the entire set of tags on a resource or subscription.
 *
 * @summary deletes the entire set of tags on a resource or subscription.
 * x-ms-original-file: 2025-04-01/DeleteTagsResource.json
 */
async function updateTagsOnAResource() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  await client.tags.deleteAtScope(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/my-resource-group/providers/myPRNameSpace/VM/myVm",
  );
}

/**
 * This sample demonstrates how to deletes the entire set of tags on a resource or subscription.
 *
 * @summary deletes the entire set of tags on a resource or subscription.
 * x-ms-original-file: 2025-04-01/DeleteTagsSubscription.json
 */
async function updateTagsOnASubscription() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  await client.tags.deleteAtScope("subscriptions/00000000-0000-0000-0000-000000000000");
}

async function main() {
  await updateTagsOnAResource();
  await updateTagsOnASubscription();
}

main().catch(console.error);
