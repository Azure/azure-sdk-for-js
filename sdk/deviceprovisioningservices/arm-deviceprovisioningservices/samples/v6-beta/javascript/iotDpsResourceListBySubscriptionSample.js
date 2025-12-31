// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the provisioning services for a given subscription id.
 *
 * @summary list all the provisioning services for a given subscription id.
 * x-ms-original-file: 2025-02-01-preview/DPSListBySubscription.json
 */
async function dpsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotDpsResource.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dpsListBySubscription();
}

main().catch(console.error);
