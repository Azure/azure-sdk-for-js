// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerate a shared access key for a namespace topic.
 *
 * @summary Regenerate a shared access key for a namespace topic.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/NamespaceTopics_RegenerateKey.json
 */

import {
  TopicRegenerateKeyRequest,
  EventGridManagementClient,
} from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function namespaceTopicsRegenerateKey(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const namespaceName = "examplenamespace2";
  const topicName = "examplenamespacetopic2";
  const regenerateKeyRequest: TopicRegenerateKeyRequest = { keyName: "key1" };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaceTopics.beginRegenerateKeyAndWait(
    resourceGroupName,
    namespaceName,
    topicName,
    regenerateKeyRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespaceTopicsRegenerateKey();
}

main().catch(console.error);
