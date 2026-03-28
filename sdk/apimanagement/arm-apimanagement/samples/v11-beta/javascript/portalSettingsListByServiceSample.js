// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a collection of portalsettings defined within a service instance..
 *
 * @summary lists a collection of portalsettings defined within a service instance..
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListPortalSettings.json
 */
async function apiManagementListPortalSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.portalSettings.listByService("rg1", "apimService1");
  console.log(result);
}

async function main() {
  await apiManagementListPortalSettings();
}

main().catch(console.error);
