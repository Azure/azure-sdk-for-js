// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Schedulers by subscription
 *
 * @summary list Schedulers by subscription
 * x-ms-original-file: 2025-04-01-preview/Schedulers_ListBySubscription.json
 */
async function schedulersListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schedulers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await schedulersListBySubscription();
}

main().catch(console.error);
