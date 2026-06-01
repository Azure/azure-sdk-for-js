// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all certificates in a resource group for a given site and a deployment slot.
 *
 * @summary get all certificates in a resource group for a given site and a deployment slot.
 * x-ms-original-file: 2025-05-01/ListSiteCertificatesByResourceGroupSlot.json
 */
async function listCertificatesByResourceGroupForASlot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.siteCertificates.listSlot(
    "testrg123",
    "testSiteName",
    "staging",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCertificatesByResourceGroupForASlot();
}

main().catch(console.error);
