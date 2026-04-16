// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the certificate from the provisioning service.
 *
 * @summary get the certificate from the provisioning service.
 * x-ms-original-file: 2025-02-01-preview/DPSGetCertificate.json
 */
async function dpsGetCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.dpsCertificate.get(
    "myResourceGroup",
    "myFirstProvisioningService",
    "cert",
  );
  console.log(result);
}

async function main() {
  await dpsGetCertificate();
}

main().catch(console.error);
