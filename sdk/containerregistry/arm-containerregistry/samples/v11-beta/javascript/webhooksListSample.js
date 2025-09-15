// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the webhooks for the specified container registry.
 *
 * @summary lists all the webhooks for the specified container registry.
 * x-ms-original-file: 2025-05-01-preview/WebhookList.json
 */
async function webhookList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webhooks.list("myResourceGroup", "myRegistry")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await webhookList();
}

main().catch(console.error);
