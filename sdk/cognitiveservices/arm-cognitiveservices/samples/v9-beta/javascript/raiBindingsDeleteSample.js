// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes one RAI binding.
 *
 * @summary deletes one RAI binding.
 * x-ms-original-file: 2026-09-15-preview/DeleteRaiBinding.json
 */
async function deleteARAIBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiBindings.delete("resource-group", "safety-account", "chat-guard", {
    ifMatch: '"00000000-0000-0000-0000-000000000002"',
  });
}

async function main() {
  await deleteARAIBinding();
}

main().catch(console.error);
