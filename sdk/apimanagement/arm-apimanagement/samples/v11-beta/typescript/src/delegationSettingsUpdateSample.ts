// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Delegation settings.
 *
 * @summary update Delegation settings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPortalSettingsUpdateDelegation.json
 */
async function apiManagementPortalSettingsUpdateDelegation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.delegationSettings.update("rg1", "apimService1", "*", {
    subscriptions: { enabled: true },
    url: "http://contoso.com/delegation",
    userRegistration: { enabled: true },
    validationKey: "<validationKey>",
  });
}

async function main(): Promise<void> {
  await apiManagementPortalSettingsUpdateDelegation();
}

main().catch(console.error);
