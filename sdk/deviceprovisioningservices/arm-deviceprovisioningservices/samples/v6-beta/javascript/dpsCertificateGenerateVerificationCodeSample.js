// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generate verification code for Proof of Possession.
 *
 * @summary generate verification code for Proof of Possession.
 * x-ms-original-file: 2025-02-01-preview/DPSGenerateVerificationCode.json
 */
async function dpsGenerateVerificationCode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.dpsCertificate.generateVerificationCode(
    "myResourceGroup",
    "myFirstProvisioningService",
    "cert",
    "AAAAAAAADGk=",
  );
  console.log(result);
}

async function main() {
  await dpsGenerateVerificationCode();
}

main().catch(console.error);
