// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a certificate used on the endpoint with the given id.
 *
 * @summary gets a certificate used on the endpoint with the given id.
 * x-ms-original-file: 2025-02-01-preview/EndpointCertificatesGet.json
 */
async function getsAnEndpointCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "38e0dc56-907f-45ba-a97c-74233baad471";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.endpointCertificates.get("testrg", "testcl", "DATABASE_MIRRORING");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAnEndpointCertificate();
}

main().catch(console.error);
