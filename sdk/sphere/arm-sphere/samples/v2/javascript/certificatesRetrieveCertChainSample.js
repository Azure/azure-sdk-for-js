// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves cert chain.
 *
 * @summary retrieves cert chain.
 * x-ms-original-file: 2024-04-01/PostRetrieveCatalogCertChain.json
 */
async function certificatesRetrieveCertChain() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.certificates.retrieveCertChain(
    "MyResourceGroup1",
    "MyCatalog1",
    "active",
  );
  console.log(result);
}

async function main() {
  await certificatesRetrieveCertChain();
}

main().catch(console.error);
