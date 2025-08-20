// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Asynchronously creates or updates a new namespace with the specified parameters.
 *
 * @summary Asynchronously creates or updates a new namespace with the specified parameters.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/Namespaces_CreateOrUpdate.json
 */

import { Namespace, EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function namespacesCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const namespaceName = "exampleNamespaceName1";
  const namespaceInfo: Namespace = {
    location: "westus",
    tags: { tag1: "value11", tag2: "value22" },
    topicSpacesConfiguration: {
      routeTopicResourceId:
        "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampleTopic1",
      state: "Enabled",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    namespaceName,
    namespaceInfo,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesCreateOrUpdate();
}

main().catch(console.error);
