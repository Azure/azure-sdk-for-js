// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or Update Delegation settings.
 *
 * @summary create or Update Delegation settings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPortalSettingsPutDelegation.json
 */
async function apiManagementPortalSettingsUpdateDelegation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.delegationSettings.createOrUpdate(
    "rg1",
    "apimService1",
    {
      subscriptions: { enabled: true },
      url: "http://contoso.com/delegation",
      userRegistration: { enabled: true },
      validationKey: "<validationKey>",
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

async function main() {
  await apiManagementPortalSettingsUpdateDelegation();
}

main().catch(console.error);
