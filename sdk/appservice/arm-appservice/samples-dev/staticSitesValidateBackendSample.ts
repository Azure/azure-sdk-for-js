/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  StaticSiteLinkedBackendARMResource,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Validates that a backend can be linked to a static site
 *
 * @summary Validates that a backend can be linked to a static site
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/ValidateLinkedBackendForStaticSite.json
 */
async function validateIfBackendCanBeLinkedToStaticSite(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const linkedBackendName = "testBackend";
  const staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource = {
    backendResourceId:
      "/subscription/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/backendRg/providers/Microsoft.Web/sites/testBackend",
    region: "West US 2",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.beginValidateBackendAndWait(
    resourceGroupName,
    name,
    linkedBackendName,
    staticSiteLinkedBackendEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validateIfBackendCanBeLinkedToStaticSite();
}

main().catch(console.error);
