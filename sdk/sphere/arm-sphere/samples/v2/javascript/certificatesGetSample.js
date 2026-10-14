// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Certificate
 *
 * @summary get a Certificate
 * x-ms-original-file: 2024-04-01/GetCertificate.json
 */
async function certificatesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.certificates.get("MyResourceGroup1", "MyCatalog1", "default");
  console.log(result);
}

async function main() {
  await certificatesGet();
}

main().catch(console.error);
