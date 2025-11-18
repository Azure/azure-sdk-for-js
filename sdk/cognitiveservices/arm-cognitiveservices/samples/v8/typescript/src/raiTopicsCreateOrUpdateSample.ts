// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RaiTopic} from "@azure/arm-cognitiveservices";
import {
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create the rai topic associated with the Azure OpenAI account.
 *
 * @summary Create the rai topic associated with the Azure OpenAI account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-09-01/examples/PutRaiTopic.json
 */
async function putRaiTopic(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const raiTopicName = "raiTopicName";
  const raiTopic: RaiTopic = {
    properties: {
      description: "This is a sample topic.",
      sampleBlobUrl: "https://example.blob.core.windows.net/sampleblob",
      topicName: "raiTopicName",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.raiTopics.createOrUpdate(
    resourceGroupName,
    accountName,
    raiTopicName,
    raiTopic,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putRaiTopic();
}

main().catch(console.error);
