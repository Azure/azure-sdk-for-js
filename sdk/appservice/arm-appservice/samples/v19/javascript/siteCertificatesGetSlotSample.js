// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a certificate for a given site and deployment slot.
 *
 * @summary get a certificate for a given site and deployment slot.
 * x-ms-original-file: 2025-05-01/GetSiteCertificateSlot.json
 */
async function getSiteCertificateForASlot() {
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

async function main() {
  await getSiteCertificateForASlot();
}

main().catch(console.error);
