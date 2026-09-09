// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of valid SKUs and tiers for a provisioning service.
 *
 * @summary gets the list of valid SKUs and tiers for a provisioning service.
 * x-ms-original-file: 2026-08-31/DPSGetValidSku.json
 */
async function dpsGetValidSku() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotDpsResource.listValidSkus(
    "myFirstProvisioningService",
    "myResourceGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dpsGetValidSku();
}

main().catch(console.error);
