// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Certificate
 *
 * @summary get a Certificate
 * x-ms-original-file: 2024-04-01/GetCertificate.json
 */
async function certificatesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.certificates.get("MyResourceGroup1", "MyCatalog1", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesGet();
}

main().catch(console.error);
