// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the entire set of tags on a resource or subscription.
 *
 * @summary Deletes the entire set of tags on a resource or subscription.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/DeleteTagsResource.json
 */

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function updateTagsOnAResource() {
  const scope =
    "subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/my-resource-group/providers/myPRNameSpace/VM/myVm";
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tagsOperations.beginDeleteAtScopeAndWait(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Deletes the entire set of tags on a resource or subscription.
 *
 * @summary Deletes the entire set of tags on a resource or subscription.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/DeleteTagsSubscription.json
 */
async function updateTagsOnASubscription() {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tagsOperations.beginDeleteAtScopeAndWait(scope);
  console.log(result);
}

async function main() {
  await updateTagsOnAResource();
  await updateTagsOnASubscription();
}

main().catch(console.error);
