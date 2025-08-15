// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CertificatePatchResource } from "@azure/arm-appservice-profile-2020-09-01-hybrid";
import { WebSiteManagementClient } from "@azure/arm-appservice-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a certificate.
 *
 * @summary Create or update a certificate.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2018-02-01/examples/PatchCertificate.json
 */
async function patchCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "testc6282";
  const certificateEnvelope: CertificatePatchResource = {
    name: "testc6282",
    type: "Microsoft.Web/certificates",
    id: "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg123/providers/Microsoft.Web/certificates/testc6282",
    password: "<password>",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.certificates.update(resourceGroupName, name, certificateEnvelope);
  console.log(result);
}

async function main(): Promise<void> {
  await patchCertificate();
}

main().catch(console.error);
