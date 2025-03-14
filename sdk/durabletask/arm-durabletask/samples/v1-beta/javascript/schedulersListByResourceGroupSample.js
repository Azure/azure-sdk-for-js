// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Schedulers by resource group
 *
 * @summary list Schedulers by resource group
 * x-ms-original-file: 2024-10-01-preview/Schedulers_ListByResourceGroup.json
 */
async function schedulersListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schedulers.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await schedulersListByResourceGroup();
}

main().catch(console.error);
