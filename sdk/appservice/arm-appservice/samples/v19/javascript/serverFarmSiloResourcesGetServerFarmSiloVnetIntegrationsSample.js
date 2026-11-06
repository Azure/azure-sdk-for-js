// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the virtual network integrations associated with an App Service plan silo.
 *
 * @summary gets the virtual network integrations associated with an App Service plan silo.
 * x-ms-original-file: 2026-08-01/ServerFarmSiloResources_GetServerFarmSiloVnetIntegrations.json
 */
async function getTheVirtualNetworkIntegrationsOfAnAppServicePlanSilo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.serverFarmSiloResources.getServerFarmSiloVnetIntegrations(
    "testrg123",
    "testsf6141",
    "silo1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the virtual network integrations associated with an App Service plan silo.
 *
 * @summary gets the virtual network integrations associated with an App Service plan silo.
 * x-ms-original-file: 2026-08-01/ServerFarmSiloResources_GetServerFarmSiloVnetIntegrations_Empty.json
 */
async function getTheVirtualNetworkIntegrationsOfAnAppServicePlanSiloWithNoIntegrations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.serverFarmSiloResources.getServerFarmSiloVnetIntegrations(
    "testrg123",
    "testsf6141",
    "silo1",
  );
  console.log(result);
}

async function main() {
  await getTheVirtualNetworkIntegrationsOfAnAppServicePlanSilo();
  await getTheVirtualNetworkIntegrationsOfAnAppServicePlanSiloWithNoIntegrations();
}

main().catch(console.error);
