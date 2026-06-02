// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get an App Service plan.
 *
 * @summary description for Get an App Service plan.
 * x-ms-original-file: 2025-05-01/GetAppServicePlan.json
 */
async function getAppServicePlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServicePlans.get("testrg123", "testsf6141");
  console.log(result);
}

async function main() {
  await getAppServicePlan();
}

main().catch(console.error);
