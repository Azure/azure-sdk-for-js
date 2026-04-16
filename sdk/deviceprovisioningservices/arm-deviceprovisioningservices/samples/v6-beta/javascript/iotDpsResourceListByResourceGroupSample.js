// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all provisioning services in the given resource group.
 *
 * @summary get a list of all provisioning services in the given resource group.
 * x-ms-original-file: 2025-02-01-preview/DPSListByResourceGroup.json
 */
async function dpsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotDpsResource.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dpsListByResourceGroup();
}

main().catch(console.error);
