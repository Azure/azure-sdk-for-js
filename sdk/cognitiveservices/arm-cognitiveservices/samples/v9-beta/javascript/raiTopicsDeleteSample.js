// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified custom topic associated with the Azure OpenAI account.
 *
 * @summary deletes the specified custom topic associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/DeleteRaiTopic.json
 */
async function deleteRaiTopic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiTopics.delete("resourceGroupName", "accountName", "raiTopicName");
}

async function main() {
  await deleteRaiTopic();
}

main().catch(console.error);
