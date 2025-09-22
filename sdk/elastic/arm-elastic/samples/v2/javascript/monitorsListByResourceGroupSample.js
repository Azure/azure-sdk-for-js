// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Elastic monitor resources within a specified resource group of the subscription, helping you audit and manage your monitoring setup.
 *
 * @summary list all Elastic monitor resources within a specified resource group of the subscription, helping you audit and manage your monitoring setup.
 * x-ms-original-file: 2025-06-01/Monitors_ListByResourceGroup.json
 */
async function monitorsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorsListByResourceGroup();
}

main().catch(console.error);
