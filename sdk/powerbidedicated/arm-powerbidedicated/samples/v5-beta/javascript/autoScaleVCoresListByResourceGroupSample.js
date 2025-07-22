// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the auto scale v-cores for the given resource group.
 *
 * @summary gets all the auto scale v-cores for the given resource group.
 * x-ms-original-file: 2021-01-01/listAutoScaleVCoresInResourceGroup.json
 */
async function listAutoScaleVCoresInResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autoScaleVCores.listByResourceGroup("TestRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAutoScaleVCoresInResourceGroup();
}

main().catch(console.error);
