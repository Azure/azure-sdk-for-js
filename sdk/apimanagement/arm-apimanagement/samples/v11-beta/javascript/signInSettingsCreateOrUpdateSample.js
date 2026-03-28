// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or Update Sign-In settings.
 *
 * @summary create or Update Sign-In settings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPortalSettingsPutSignIn.json
 */
async function apiManagementPortalSettingsUpdateSignIn() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.signInSettings.createOrUpdate(
    "rg1",
    "apimService1",
    { enabled: true },
    { ifMatch: "*" },
  );
  console.log(result);
}

async function main() {
  await apiManagementPortalSettingsUpdateSignIn();
}

main().catch(console.error);
