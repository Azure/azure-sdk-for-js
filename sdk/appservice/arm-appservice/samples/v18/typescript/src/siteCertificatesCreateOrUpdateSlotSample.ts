// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Certificate} from "@azure/arm-appservice";
import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a certificate in a given site and deployment slot.
 *
 * @summary Create or update a certificate in a given site and deployment slot.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/CreateOrUpdateSiteCertificateSlot.json
 */
async function createOrUpdateCertificateForSlot(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "testSiteName";
  const slot = "staging";
  const certificateName = "testc6282";
  const certificateEnvelope: Certificate = {
    hostNames: ["ServerCert"],
    location: "East US",
    password: "<password>",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteCertificates.createOrUpdateSlot(
    resourceGroupName,
    name,
    slot,
    certificateName,
    certificateEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateCertificateForSlot();
}

main().catch(console.error);
