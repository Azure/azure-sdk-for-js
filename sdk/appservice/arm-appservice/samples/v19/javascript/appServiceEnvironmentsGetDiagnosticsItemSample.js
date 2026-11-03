// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get a diagnostics item for an App Service Environment.
 *
 * @summary description for Get a diagnostics item for an App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_GetDiagnosticsItem.json
 */
async function getADiagnosticsItemForAnAppServiceEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.getDiagnosticsItem(
    "test-rg",
    "test-ase",
    "test-diagnostic",
  );
  console.log(result);
}

async function main() {
  await getADiagnosticsItemForAnAppServiceEnvironment();
}

main().catch(console.error);
