// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a AIManager
 *
 * @summary update a AIManager
 * x-ms-original-file: 2026-05-02-preview/AIManagers_Update.json
 */
async function updatesAnAIManagerResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagers.update("rg1", "aimanager1", {
    tags: { key1: "value1", key2: "value2" },
    identity: { type: "SystemAssigned" },
  });
  console.log(result);
}

async function main() {
  await updatesAnAIManagerResource();
}

main().catch(console.error);
