// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Sign In Settings for the Portal
 *
 * @summary get Sign In Settings for the Portal
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPortalSettingsGetSignIn.json
 */
async function apiManagementPortalSettingsGetSignIn() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.signInSettings.get("rg1", "apimService1");
  console.log(result);
}

async function main() {
  await apiManagementPortalSettingsGetSignIn();
}

main().catch(console.error);
