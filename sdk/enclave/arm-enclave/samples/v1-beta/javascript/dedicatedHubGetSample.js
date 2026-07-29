// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-enclave");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DedicatedHubResource
 *
 * @summary get a DedicatedHubResource
 * x-ms-original-file: 2026-03-01-preview/DedicatedHubs_Get.json
 */
async function dedicatedHubGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.dedicatedHub.get(
    "TestResourceGroup",
    "TestCommunity",
    "TestDedicatedHub",
  );
  console.log(result);
}

async function main() {
  await dedicatedHubGet();
}

main().catch(console.error);
