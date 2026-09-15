// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list private link resources for the given provisioning service
 *
 * @summary list private link resources for the given provisioning service
 * x-ms-original-file: 2026-08-31/DPSListPrivateLinkResources.json
 */
async function privateLinkResourcesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.listPrivateLinkResources(
    "myResourceGroup",
    "myFirstProvisioningService",
  );
  console.log(result);
}

async function main() {
  await privateLinkResourcesList();
}

main().catch(console.error);
