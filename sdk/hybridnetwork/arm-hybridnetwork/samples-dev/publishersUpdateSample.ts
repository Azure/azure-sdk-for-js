// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TagsObject, PublishersUpdateOptionalParams } from "@azure/arm-hybridnetwork";
import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a publisher resource.
 *
 * @summary Update a publisher resource.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/PublisherUpdateTags.json
 */
async function updateAPublisherTags(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const parameters: TagsObject = { tags: { tag1: "value1", tag2: "value2" } };
  const options: PublishersUpdateOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.publishers.update(resourceGroupName, publisherName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await updateAPublisherTags();
}

main().catch(console.error);
