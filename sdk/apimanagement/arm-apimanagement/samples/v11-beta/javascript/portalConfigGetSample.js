// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the developer portal configuration.
 *
 * @summary get the developer portal configuration.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPortalConfig.json
 */
async function apiManagementPortalConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.portalConfig.get("rg1", "apimService1", "default");
  console.log(result);
}

async function main() {
  await apiManagementPortalConfig();
}

main().catch(console.error);
