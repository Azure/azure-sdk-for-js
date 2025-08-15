// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VnetParameters } from "@azure/arm-appservice-profile-2020-09-01-hybrid";
import { WebSiteManagementClient } from "@azure/arm-appservice-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules.
 *
 * @summary Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2018-02-01/examples/VerifyHostingEnvironmentVnet.json
 */
async function verifyHostingEnvironmentVnet(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
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
