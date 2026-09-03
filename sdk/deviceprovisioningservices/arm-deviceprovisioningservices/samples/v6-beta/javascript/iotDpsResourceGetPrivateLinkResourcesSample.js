// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified private link resource for the given provisioning service
 *
 * @summary get the specified private link resource for the given provisioning service
 * x-ms-original-file: 2025-02-01-preview/DPSGetPrivateLinkResources.json
 */
async function privateLinkResourcesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.getPrivateLinkResources(
    "myResourceGroup",
    "myFirstProvisioningService",
    "iotDps",
  );
  console.log(result);
}

async function main() {
  await privateLinkResourcesList();
}

main().catch(console.error);
