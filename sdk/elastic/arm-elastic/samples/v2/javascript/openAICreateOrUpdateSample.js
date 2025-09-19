// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an OpenAI integration rule for a given Elastic monitor resource, enabling advanced AI-driven observability and monitoring.
 *
 * @summary create or update an OpenAI integration rule for a given Elastic monitor resource, enabling advanced AI-driven observability and monitoring.
 * x-ms-original-file: 2025-06-01/OpenAI_CreateOrUpdate.json
 */
async function openAICreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.openAI.createOrUpdate("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main() {
  await openAICreateOrUpdate();
}

main().catch(console.error);
