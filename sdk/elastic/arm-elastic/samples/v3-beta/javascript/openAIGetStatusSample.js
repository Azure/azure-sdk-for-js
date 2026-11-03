// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the status of OpenAI integration for a given Elastic monitor resource, ensuring optimal observability and performance.
 *
 * @summary get the status of OpenAI integration for a given Elastic monitor resource, ensuring optimal observability and performance.
 * x-ms-original-file: 2025-06-01/OpenAI_GetStatus.json
 */
async function openAIGetStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.openAI.getStatus("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main() {
  await openAIGetStatus();
}

main().catch(console.error);
