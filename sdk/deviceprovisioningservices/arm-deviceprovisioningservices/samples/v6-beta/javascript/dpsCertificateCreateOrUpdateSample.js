// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to add new certificate or update an existing certificate.
 *
 * @summary add new certificate or update an existing certificate.
 * x-ms-original-file: 2025-02-01-preview/DPSCertificateCreateOrUpdate.json
 */
async function dpsCreateOrUpdateCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.dpsCertificate.createOrUpdate(
    "myResourceGroup",
    "myFirstProvisioningService",
    "cert",
    { properties: { certificate: Buffer.from("MA==") } },
  );
  console.log(result);
}

async function main() {
  await dpsCreateOrUpdateCertificate();
}

main().catch(console.error);
