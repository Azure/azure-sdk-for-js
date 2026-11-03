// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a certificate for a site and deployment slot.
 *
 * @summary create or update a certificate for a site and deployment slot.
 * x-ms-original-file: 2025-05-01/PatchSiteCertificateSlot.json
 */
async function patchCertificateForSlot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.updateSlot(
    "testrg123",
    "testSiteName",
    "staging",
    "testc6282",
    {
      keyVaultId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg123/providers/Microsoft.KeyVault/vaults/testKV",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchCertificateForSlot();
}

main().catch(console.error);
