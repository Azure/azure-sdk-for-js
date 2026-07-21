// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 *
 * @summary this operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 * x-ms-original-file: 2025-04-01/PutTagsResource.json
 */
async function updateTagsOnAResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tagsOperations.createOrUpdateAtScope(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/my-resource-group/providers/myPRNameSpace/VM/myVm",
    { properties: { tags: { tagKey1: "tag-value-1", tagKey2: "tag-value-2" } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 *
 * @summary this operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 * x-ms-original-file: 2025-04-01/PutTagsSubscription.json
 */
async function updateTagsOnASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tagsOperations.createOrUpdateAtScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { properties: { tags: { tagKey1: "tag-value-1", tagKey2: "tag-value-2" } } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateTagsOnAResource();
  await updateTagsOnASubscription();
}

main().catch(console.error);
