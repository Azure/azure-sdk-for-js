// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-enclave");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a DedicatedHubResource
 *
 * @summary create a DedicatedHubResource
 * x-ms-original-file: 2026-03-01-preview/DedicatedHubs_CreateOrUpdate.json
 */
async function dedicatedHubCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.dedicatedHub.createOrUpdate(
    "TestResourceGroup",
    "TestCommunity",
    "TestDedicatedHub",
    {
      location: "eastus",
      properties: { designation: "Reserved" },
      tags: { environment: "test", project: "mission" },
    },
  );
  console.log(result);
}

async function main() {
  await dedicatedHubCreateOrUpdate();
}

main().catch(console.error);
