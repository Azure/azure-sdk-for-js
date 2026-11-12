// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets one RAI binding.
 *
 * @summary gets one RAI binding.
 * x-ms-original-file: 2026-09-15-preview/GetRaiBinding.json
 */
async function getARAIBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBindings.get("resource-group", "safety-account", "chat-guard");
  console.log(result);
}

async function main() {
  await getARAIBinding();
}

main().catch(console.error);
