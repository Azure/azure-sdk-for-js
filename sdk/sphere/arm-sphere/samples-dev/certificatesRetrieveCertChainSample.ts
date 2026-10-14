// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves cert chain.
 *
 * @summary retrieves cert chain.
 * x-ms-original-file: 2024-04-01/PostRetrieveCatalogCertChain.json
 */
async function certificatesRetrieveCertChain(): Promise<void> {
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

async function main(): Promise<void> {
  await certificatesRetrieveCertChain();
}

main().catch(console.error);
