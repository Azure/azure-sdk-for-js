// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Create or update an App Service Environment.
 *
 * @summary description for Create or update an App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_CreateOrUpdate.json
 */
async function createOrUpdateAnAppServiceEnvironment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.createOrUpdate("test-rg", "test-ase", {
    kind: "Asev3",
    location: "South Central US",
    virtualNetwork: {
      id: "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/delegated",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnAppServiceEnvironment();
}

main().catch(console.error);
