// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a certificate belonging to a given site.
 *
 * @summary get a certificate belonging to a given site.
 * x-ms-original-file: 2025-05-01/GetSiteCertificate.json
 */
async function getCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.get("testrg123", "testSiteName", "testc6282");
  console.log(result);
}

async function main(): Promise<void> {
  await getCertificate();
}

main().catch(console.error);
