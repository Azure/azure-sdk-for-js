// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Create or update a certificate.
 *
 * @summary description for Create or update a certificate.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateCertificate.json
 */
async function createOrUpdateCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.certificates.createOrUpdate("testrg123", "testc6282", {
    location: "East US",
    hostNames: ["ServerCert"],
    password: "<password>",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateCertificate();
}

main().catch(console.error);
