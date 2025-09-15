// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 *
 * @summary This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/PutTagsResource.json
 */

import { TagsResource, ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateTagsOnAResource(): Promise<void> {
  const scope =
    "subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/my-resource-group/providers/myPRNameSpace/VM/myVm";
  const parameters: TagsResource = {
    properties: { tags: { tagKey1: "tag-value-1", tagKey2: "tag-value-2" } },
  };
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tagsOperations.beginCreateOrUpdateAtScopeAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 *
 * @summary This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/PutTagsSubscription.json
 */
async function updateTagsOnASubscription(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const parameters: TagsResource = {
    properties: { tags: { tagKey1: "tag-value-1", tagKey2: "tag-value-2" } },
  };
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tagsOperations.beginCreateOrUpdateAtScopeAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateTagsOnAResource();
  await updateTagsOnASubscription();
}

main().catch(console.error);
