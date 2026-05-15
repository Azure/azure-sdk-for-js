// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified custom topic associated with the Azure OpenAI account.
 *
 * @summary gets the specified custom topic associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/GetRaiTopic.json
 */
async function getRaiTopic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiTopics.get("resourceGroupName", "accountName", "raiTopicName");
  console.log(result);
}

async function main() {
  await getRaiTopic();
}

main().catch(console.error);
