// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-serviceconnectioncontroller");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Azure Service Connection Controller. Only its owning Probing Gateway may call this operation.
 *
 * @summary deletes an Azure Service Connection Controller. Only its owning Probing Gateway may call this operation.
 * x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_Delete.json
 */
async function azureServiceConnectionControllersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkClient(credential, subscriptionId);
  await client.azureServiceConnectionControllers.delete("rg1", "pg1");
}

async function main() {
  await azureServiceConnectionControllersDelete();
}

main().catch(console.error);
