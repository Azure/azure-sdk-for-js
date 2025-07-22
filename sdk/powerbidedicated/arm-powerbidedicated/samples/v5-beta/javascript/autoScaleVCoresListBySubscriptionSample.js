// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the auto scale v-cores for the given subscription.
 *
 * @summary lists all the auto scale v-cores for the given subscription.
 * x-ms-original-file: 2021-01-01/listAutoScaleVCoresInSubscription.json
 */
async function listAutoScaleVCoresInSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autoScaleVCores.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAutoScaleVCoresInSubscription();
}

main().catch(console.error);
