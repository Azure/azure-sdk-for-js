// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-enclave");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DedicatedHubResource
 *
 * @summary delete a DedicatedHubResource
 * x-ms-original-file: 2026-03-01-preview/DedicatedHubs_Delete.json
 */
async function dedicatedHubDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  await client.dedicatedHub.delete("TestResourceGroup", "TestCommunity", "TestDedicatedHub");
}

async function main() {
  await dedicatedHubDelete();
}

main().catch(console.error);
