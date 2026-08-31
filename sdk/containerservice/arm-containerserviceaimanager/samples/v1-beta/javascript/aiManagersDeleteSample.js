// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a AIManager
 *
 * @summary delete a AIManager
 * x-ms-original-file: 2026-05-02-preview/AIManagers_Delete.json
 */
async function deletesAnAIManagerResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.aiManagers.delete("rg1", "aimanager1");
}

async function main() {
  await deletesAnAIManagerResource();
}

main().catch(console.error);
