// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a certificate under a given site.
 *
 * @summary create or update a certificate under a given site.
 * x-ms-original-file: 2025-05-01/PatchSiteCertificate.json
 */
async function patchCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.update("testrg123", "testSiteName", "testc6282", {
    keyVaultId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg123/providers/Microsoft.KeyVault/vaults/testKV",
  });
  console.log(result);
}

async function main() {
  await patchCertificate();
}

main().catch(console.error);
