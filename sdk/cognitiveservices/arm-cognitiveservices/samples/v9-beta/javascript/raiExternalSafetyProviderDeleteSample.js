// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified custom topic associated with the subscription.
 *
 * @summary deletes the specified custom topic associated with the subscription.
 * x-ms-original-file: 2026-01-15-preview/DeleteRaiExternalSafetyProvider.json
 */
async function deleteRaiTopic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiExternalSafetyProvider.delete("safetyProviderName");
}

async function main() {
  await deleteRaiTopic();
}

main().catch(console.error);
