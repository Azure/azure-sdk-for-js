// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceUpdateClient } = require("@azure/arm-deviceregistrysoftwareupdate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns list of Update Instances.
 *
 * @summary returns list of Update Instances.
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_ListBySubscription.json
 */
async function getsListOfUpdateInstancesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.updateInstances.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsListOfUpdateInstancesBySubscription();
}

main().catch(console.error);
