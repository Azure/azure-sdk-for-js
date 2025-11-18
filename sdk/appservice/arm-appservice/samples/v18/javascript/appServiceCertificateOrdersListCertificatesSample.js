// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for List all certificates associated with a certificate order.
 *
 * @summary Description for List all certificates associated with a certificate order.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2024-11-01/examples/ListCertificatesByAppServiceCertificateOrder.json
 */

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function listCertificatesByAppServiceCertificate() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const certificateOrderName = "SampleCertificateOrderName";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceCertificateOrders.listCertificates(
    resourceGroupName,
    certificateOrderName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listCertificatesByAppServiceCertificate();
}

main().catch(console.error);
