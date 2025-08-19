// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TagsObject } from "@azure/arm-hybridnetwork";
import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a configuration group schema resource.
 *
 * @summary Updates a configuration group schema resource.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ConfigurationGroupSchemaUpdateTags.json
 */
async function createOrUpdateTheConfigurationGroupSchemaResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg1";
  const publisherName = "testPublisher";
  const configurationGroupSchemaName = "testConfigurationGroupSchema";
  const parameters: TagsObject = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.configurationGroupSchemas.update(
    resourceGroupName,
    publisherName,
    configurationGroupSchemaName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateTheConfigurationGroupSchemaResource();
}

main().catch(console.error);
