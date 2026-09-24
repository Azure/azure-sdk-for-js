// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all the certificates tied to the provisioning service.
 *
 * @summary get all the certificates tied to the provisioning service.
 * x-ms-original-file: 2026-08-31/DPSGetCertificates.json
 */
async function dpsGetCertificates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.dpsCertificate.list("myResourceGroup", "myFirstProvisioningService");
  console.log(result);
}

async function main() {
  await dpsGetCertificates();
}

main().catch(console.error);
