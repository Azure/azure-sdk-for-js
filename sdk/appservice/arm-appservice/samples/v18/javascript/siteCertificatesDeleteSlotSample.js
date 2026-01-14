// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete a certificate for a given site and deployment slot.
 *
 * @summary Delete a certificate for a given site and deployment slot.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/DeleteSiteCertificateSlot.json
 */
async function deleteCertificateForSlot() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "testSiteName";
  const slot = "staging";
  const certificateName = "testc6282";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.deleteSlot(
    resourceGroupName,
    name,
    slot,
    certificateName,
  );
  console.log(result);
}

async function main() {
  await deleteCertificateForSlot();
}

main().catch(console.error);
