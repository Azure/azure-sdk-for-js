// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-serviceconnectioncontroller");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the tags of an Azure Service Connection Controller.
 *
 * @summary updates the tags of an Azure Service Connection Controller.
 * x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_Update.json
 */
async function azureServiceConnectionControllersUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.azureServiceConnectionControllers.update("rg1", "pg1", {
    tags: { environment: "production" },
  });
  console.log(result);
}

async function main() {
  await azureServiceConnectionControllersUpdate();
}

main().catch(console.error);
