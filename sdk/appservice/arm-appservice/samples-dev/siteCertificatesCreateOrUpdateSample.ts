// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a certificate under a given site.
 *
 * @summary Create or update a certificate under a given site.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/CreateOrUpdateSiteCertificate.json
 */

import { Certificate, WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "testSiteName";
  const certificateName = "testc6282";
  const certificateEnvelope: Certificate = {
    hostNames: ["ServerCert"],
    location: "East US",
    password: "<password>",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.createOrUpdate(
    resourceGroupName,
    name,
    certificateName,
    certificateEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateCertificate();
}

main().catch(console.error);
