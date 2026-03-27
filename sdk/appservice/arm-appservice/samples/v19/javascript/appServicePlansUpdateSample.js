// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Creates or updates an App Service Plan.
 *
 * @summary description for Creates or updates an App Service Plan.
 * x-ms-original-file: 2025-05-01/PatchAppServicePlan.json
 */
async function patchServicePlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServicePlans.update("testrg123", "testsf6141", { kind: "app" });
  console.log(result);
}

async function main() {
  await patchServicePlan();
}

main().catch(console.error);
