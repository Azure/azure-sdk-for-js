// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete a certificate from the site.
 *
 * @summary Delete a certificate from the site.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/DeleteSiteCertificate.json
 */
async function deleteCertificate() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "testSiteName";
  const certificateName = "testc6282";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.delete(resourceGroupName, name, certificateName);
  console.log(result);
}

async function main() {
  await deleteCertificate();
}

main().catch(console.error);
