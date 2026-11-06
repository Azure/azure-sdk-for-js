// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-serviceconnectioncontroller");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Azure Service Connection Controllers within a subscription.
 *
 * @summary lists all Azure Service Connection Controllers within a subscription.
 * x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_ListBySubscription.json
 */
async function azureServiceConnectionControllersListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureServiceConnectionControllers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await azureServiceConnectionControllersListBySubscription();
}

main().catch(console.error);
