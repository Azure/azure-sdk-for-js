// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a certificate from the site.
 *
 * @summary delete a certificate from the site.
 * x-ms-original-file: 2025-05-01/DeleteSiteCertificate.json
 */
async function deleteCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.siteCertificates.delete("testrg123", "testSiteName", "testc6282");
}

async function main() {
  await deleteCertificate();
}

main().catch(console.error);
