// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates verification code for proof of possession flow. The verification code will be used to generate a leaf certificate.
 *
 * @summary generates verification code for proof of possession flow. The verification code will be used to generate a leaf certificate.
 * x-ms-original-file: 2026-03-01-preview/iothub_generateverificationcode.json
 */
async function certificatesGenerateVerificationCode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.certificates.generateVerificationCode(
    "myResourceGroup",
    "testHub",
    "cert",
    "AAAAAAAADGk=",
  );
  console.log(result);
}

async function main() {
  await certificatesGenerateVerificationCode();
}

main().catch(console.error);
