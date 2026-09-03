// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate.
 *
 * @summary verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate.
 * x-ms-original-file: 2025-02-01-preview/DPSVerifyCertificate.json
 */
async function dpsVerifyCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.dpsCertificate.verifyCertificate(
    "myResourceGroup",
    "myFirstProvisioningService",
    "cert",
    "AAAAAAAADGk=",
    { certificate: "#####################################" },
  );
  console.log(result);
}

async function main() {
  await dpsVerifyCertificate();
}

main().catch(console.error);
