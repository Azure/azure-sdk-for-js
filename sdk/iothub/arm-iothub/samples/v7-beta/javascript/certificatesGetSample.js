// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the certificate.
 *
 * @summary returns the certificate.
 * x-ms-original-file: 2026-03-01-preview/iothub_getcertificate.json
 */
async function certificatesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.certificates.get("myResourceGroup", "testhub", "cert");
  console.log(result);
}

async function main() {
  await certificatesGet();
}

main().catch(console.error);
