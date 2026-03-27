// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the custom topics associated with the Azure OpenAI account.
 *
 * @summary gets the custom topics associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/ListRaiTopics.json
 */
async function listRaiTopics() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiTopics.list("resourceGroupName", "accountName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRaiTopics();
}

main().catch(console.error);
