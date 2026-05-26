// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create the rai topic associated with the Azure OpenAI account.
 *
 * @summary create the rai topic associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/PutRaiTopic.json
 */
async function putRaiTopic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiTopics.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "raiTopicName",
    {
      properties: {
        description: "This is a sample topic.",
        sampleBlobUrl: "https://example.blob.core.windows.net/sampleblob",
        topicName: "raiTopicName",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putRaiTopic();
}

main().catch(console.error);
