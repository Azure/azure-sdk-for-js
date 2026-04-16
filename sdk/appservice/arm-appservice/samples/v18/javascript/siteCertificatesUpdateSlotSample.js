// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update a certificate for a site and deployment slot.
 *
 * @summary Create or update a certificate for a site and deployment slot.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/PatchSiteCertificateSlot.json
 */
async function patchCertificateForSlot() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "testSiteName";
  const slot = "staging";
  const certificateName = "testc6282";
  const certificateEnvelope = {
    keyVaultId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg123/providers/Microsoft.KeyVault/vaults/testKV",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.updateSlot(
    resourceGroupName,
    name,
    slot,
    certificateName,
    certificateEnvelope,
  );
  console.log(result);
}

async function main() {
  await patchCertificateForSlot();
}

main().catch(console.error);
