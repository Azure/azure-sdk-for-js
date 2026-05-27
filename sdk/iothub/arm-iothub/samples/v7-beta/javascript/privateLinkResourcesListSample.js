// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list private link resources for the given IotHub
 *
 * @summary list private link resources for the given IotHub
 * x-ms-original-file: 2026-03-01-preview/iothub_listprivatelinkresources.json
 */
async function privateLinkResourcesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.privateLinkResources.list("myResourceGroup", "testHub");
  console.log(result);
}

async function main() {
  await privateLinkResourcesList();
}

main().catch(console.error);
