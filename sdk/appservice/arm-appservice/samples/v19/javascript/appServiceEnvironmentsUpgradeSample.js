// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Initiate an upgrade of an App Service Environment if one is available.
 *
 * @summary description for Initiate an upgrade of an App Service Environment if one is available.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_Upgrade.json
 */
async function initiateAnUpgradeOnAnAppServiceEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.appServiceEnvironments.upgrade("rg", "SampleHostingEnvironment");
}

async function main() {
  await initiateAnUpgradeOnAnAppServiceEnvironment();
}

main().catch(console.error);
