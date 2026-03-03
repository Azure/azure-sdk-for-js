// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a certificate in a given site and deployment slot.
 *
 * @summary create or update a certificate in a given site and deployment slot.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateSiteCertificateSlot.json
 */
async function createOrUpdateCertificateForSlot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.createOrUpdateSlot(
    "testrg123",
    "testSiteName",
    "staging",
    "testc6282",
    { location: "East US", hostNames: ["ServerCert"], password: "<password>" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateCertificateForSlot();
}

main().catch(console.error);
