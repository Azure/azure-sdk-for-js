// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a certificate for a given site and deployment slot.
 *
 * @summary delete a certificate for a given site and deployment slot.
 * x-ms-original-file: 2025-05-01/DeleteSiteCertificateSlot.json
 */
async function deleteCertificateForSlot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.siteCertificates.deleteSlot("testrg123", "testSiteName", "staging", "testc6282");
}

async function main(): Promise<void> {
  await deleteCertificateForSlot();
}

main().catch(console.error);
