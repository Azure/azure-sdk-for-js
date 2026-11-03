// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a certificate under a given site.
 *
 * @summary create or update a certificate under a given site.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateSiteCertificate.json
 */
async function createOrUpdateCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.createOrUpdate(
    "testrg123",
    "testSiteName",
    "testc6282",
    { location: "East US", hostNames: ["ServerCert"], password: "<password>" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateCertificate();
}

main().catch(console.error);
