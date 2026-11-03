// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all silos for an App Service plan.
 *
 * @summary gets all silos for an App Service plan.
 * x-ms-original-file: 2026-08-01/ServerFarmSiloResources_ListServerFarmSilos.json
 */
async function listTheSilosOfAnAppServicePlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverFarmSiloResources.listServerFarmSilos(
    "testrg123",
    "testsf6141",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheSilosOfAnAppServicePlan();
}

main().catch(console.error);
