// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation allows replacing, merging or selectively deleting tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags at the end of the operation. The 'replace' option replaces the entire set of existing tags with a new set. The 'merge' option allows adding tags with new names and updating the values of tags with existing names. The 'delete' option allows selectively deleting tags based on given names or name/value pairs.
 *
 * @summary this operation allows replacing, merging or selectively deleting tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags at the end of the operation. The 'replace' option replaces the entire set of existing tags with a new set. The 'merge' option allows adding tags with new names and updating the values of tags with existing names. The 'delete' option allows selectively deleting tags based on given names or name/value pairs.
 * x-ms-original-file: 2025-04-01/PatchTagsResource.json
 */
async function updateTagsOnAResource() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tags.updateAtScope(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/my-resource-group/providers/myPRNameSpace/VM/myVm",
    {
      operation: "Replace",
      properties: { tags: { tagKey1: "tag-value-1", tagKey2: "tag-value-2" } },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation allows replacing, merging or selectively deleting tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags at the end of the operation. The 'replace' option replaces the entire set of existing tags with a new set. The 'merge' option allows adding tags with new names and updating the values of tags with existing names. The 'delete' option allows selectively deleting tags based on given names or name/value pairs.
 *
 * @summary this operation allows replacing, merging or selectively deleting tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags at the end of the operation. The 'replace' option replaces the entire set of existing tags with a new set. The 'merge' option allows adding tags with new names and updating the values of tags with existing names. The 'delete' option allows selectively deleting tags based on given names or name/value pairs.
 * x-ms-original-file: 2025-04-01/PatchTagsSubscription.json
 */
async function updateTagsOnASubscription() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tags.updateAtScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    {
      operation: "Replace",
      properties: { tags: { tagKey1: "tag-value-1", tagKey2: "tag-value-2" } },
    },
  );
  console.log(result);
}

async function main() {
  await updateTagsOnAResource();
  await updateTagsOnASubscription();
}

main().catch(console.error);
