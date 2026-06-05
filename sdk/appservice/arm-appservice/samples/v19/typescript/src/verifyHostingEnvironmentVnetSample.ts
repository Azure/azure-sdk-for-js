// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules.
 *
 * @summary description for Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules.
 * x-ms-original-file: 2025-05-01/VerifyHostingEnvironmentVnet.json
 */
async function verifyHostingEnvironmentVnet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.verifyHostingEnvironmentVnet({
    vnetName: "vNet123",
    vnetResourceGroup: "vNet123rg",
    vnetSubnetName: "vNet123SubNet",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await verifyHostingEnvironmentVnet();
}

main().catch(console.error);
