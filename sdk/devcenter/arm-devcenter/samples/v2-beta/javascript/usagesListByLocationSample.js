// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the current usages and limits in this location for the provided subscription.
 *
 * @summary lists the current usages and limits in this location for the provided subscription.
 * x-ms-original-file: 2026-01-01-preview/Usages_ListByLocation.json
 */
async function listUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listByLocation("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listUsages();
}

main().catch(console.error);
