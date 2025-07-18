/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { VnetParameters, WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules.
 *
 * @summary Description for Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/VerifyHostingEnvironmentVnet.json
 */
async function verifyHostingEnvironmentVnet(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const parameters: VnetParameters = {
    vnetName: "vNet123",
    vnetResourceGroup: "vNet123rg",
    vnetSubnetName: "vNet123SubNet",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.verifyHostingEnvironmentVnet(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await verifyHostingEnvironmentVnet();
}

main().catch(console.error);
