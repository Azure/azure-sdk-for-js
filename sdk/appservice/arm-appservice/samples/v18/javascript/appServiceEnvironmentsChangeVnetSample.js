// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Move an App Service Environment to a different VNET.
 *
 * @summary description for Move an App Service Environment to a different VNET.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_ChangeVnet.json
 */
async function moveAnAppServiceEnvironmentToADifferentVnet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.changeVnet("test-rg", "test-ase", {
    id: "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/default",
  });
  console.log(result);
}

async function main() {
  await moveAnAppServiceEnvironmentToADifferentVnet();
}

main().catch(console.error);
