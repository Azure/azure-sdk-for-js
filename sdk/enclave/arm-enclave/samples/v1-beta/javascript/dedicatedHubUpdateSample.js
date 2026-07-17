// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-enclave");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a DedicatedHubResource
 *
 * @summary update a DedicatedHubResource
 * x-ms-original-file: 2026-03-01-preview/DedicatedHubs_Update.json
 */
async function dedicatedHubUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.dedicatedHub.update(
    "TestResourceGroup",
    "TestCommunity",
    "TestDedicatedHub",
    {
      properties: { designation: "Pooled" },
      tags: { environment: "production", project: "mission", updated: "true" },
    },
  );
  console.log(result);
}

async function main() {
  await dedicatedHubUpdate();
}

main().catch(console.error);
