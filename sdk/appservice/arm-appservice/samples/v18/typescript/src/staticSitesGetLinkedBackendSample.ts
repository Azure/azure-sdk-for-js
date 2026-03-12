// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns the details of a linked backend linked to a static site by name
 *
 * @summary Returns the details of a linked backend linked to a static site by name
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/GetLinkedBackendForStaticSite.json
 */
async function getDetailsOfTheLinkedBackendRegisteredWithAStaticSiteByName(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const linkedBackendName = "testBackend";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getLinkedBackend(
    resourceGroupName,
    name,
    linkedBackendName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfTheLinkedBackendRegisteredWithAStaticSiteByName();
}

main().catch(console.error);
