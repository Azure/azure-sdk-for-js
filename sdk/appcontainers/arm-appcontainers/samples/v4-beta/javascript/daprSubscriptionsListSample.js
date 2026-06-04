// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Dapr subscriptions for a managed environment.
 *
 * @summary get the Dapr subscriptions for a managed environment.
 * x-ms-original-file: 2025-10-02-preview/DaprSubscriptions_List.json
 */
async function listDaprSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.daprSubscriptions.list("examplerg", "myenvironment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDaprSubscriptions();
}

main().catch(console.error);
