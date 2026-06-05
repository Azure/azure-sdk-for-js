// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 *
 * @summary This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/PutTagsResource.json
 */

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function updateTagsOnAResource() {
  const scope =
    "subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/my-resource-group/providers/myPRNameSpace/VM/myVm";
  const parameters = {
    properties: { tags: { tagKey1: "tag-value-1", tagKey2: "tag-value-2" } },
  };
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tagsOperations.beginCreateOrUpdateAtScopeAndWait(scope, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 *
 * @summary This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/PutTagsSubscription.json
 */
async function updateTagsOnASubscription() {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const parameters = {
    properties: { tags: { tagKey1: "tag-value-1", tagKey2: "tag-value-2" } },
  };
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tagsOperations.beginCreateOrUpdateAtScopeAndWait(scope, parameters);
  console.log(result);
}

async function main() {
  await updateTagsOnAResource();
  await updateTagsOnASubscription();
}

main().catch(console.error);
