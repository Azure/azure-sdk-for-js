// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Create or update an App Service Environment.
 *
 * @summary description for Create or update an App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_Update.json
 */
async function createOrUpdateAnAppServiceEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.update("test-rg", "test-ase", {
    frontEndScaleFactor: 20,
    virtualNetwork: {
      id: "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-subnet/subnets/delegated",
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAnAppServiceEnvironment();
}

main().catch(console.error);
