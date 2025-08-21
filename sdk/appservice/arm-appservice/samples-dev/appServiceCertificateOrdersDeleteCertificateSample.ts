// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Delete the certificate associated with a certificate order.
 *
 * @summary Description for Delete the certificate associated with a certificate order.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2024-11-01/examples/DeleteAppServiceCertificate.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAppServiceCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const certificateOrderName = "SampleCertificateOrderName";
  const name = "SampleCertName1";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.deleteCertificate(
    resourceGroupName,
    certificateOrderName,
    name,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAppServiceCertificate();
}

main().catch(console.error);
