// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a certificate for a given site and deployment slot.
 *
 * @summary get a certificate for a given site and deployment slot.
 * x-ms-original-file: 2025-05-01/GetSiteCertificateSlot.json
 */
async function getSiteCertificateForASlot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.getSlot(
    "testrg123",
    "testSiteName",
    "staging",
    "testc6282",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSiteCertificateForASlot();
}

main().catch(console.error);
