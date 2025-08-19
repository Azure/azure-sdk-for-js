// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the entire set of tags on a resource or subscription.
 *
 * @summary Deletes the entire set of tags on a resource or subscription.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/DeleteTagsResource.json
 */

import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateTagsOnAResource(): Promise<void> {
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
async function updateTagsOnASubscription(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.tagsOperations.beginDeleteAtScopeAndWait(scope);
  console.log(result);
}

async function main(): Promise<void> {
  await updateTagsOnAResource();
  await updateTagsOnASubscription();
}

main().catch(console.error);
