// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Suspend an App Service Environment.
 *
 * @summary description for Suspend an App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_Suspend.json
 */
async function suspendAnAppServiceEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.suspend("test-rg", "test-ase");
  console.log(result);
}

async function main() {
  await suspendAnAppServiceEnvironment();
}

main().catch(console.error);
