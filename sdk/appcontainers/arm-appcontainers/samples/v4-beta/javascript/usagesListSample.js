// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets, for the specified location, the current resource usage information as well as the limits under the subscription.
 *
 * @summary gets, for the specified location, the current resource usage information as well as the limits under the subscription.
 * x-ms-original-file: 2025-10-02-preview/Usages_List.json
 */
async function listUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listUsages();
}

main().catch(console.error);
