// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Retrieve the list of certificate actions.
 *
 * @summary Description for Retrieve the list of certificate actions.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2024-11-01/examples/RetrieveCertificateOrderActions.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveCertificateOrderActions(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "SampleCertOrder";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result =
    await client.appServiceCertificateOrders.retrieveCertificateActions(
      resourceGroupName,
      name,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveCertificateOrderActions();
}

main().catch(console.error);
