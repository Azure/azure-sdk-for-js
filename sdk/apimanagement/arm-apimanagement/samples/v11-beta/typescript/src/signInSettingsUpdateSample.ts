// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Sign-In settings.
 *
 * @summary update Sign-In settings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPortalSettingsUpdateSignIn.json
 */
async function apiManagementPortalSettingsUpdateSignIn(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.signInSettings.update("rg1", "apimService1", "*", { enabled: true });
}

async function main(): Promise<void> {
  await apiManagementPortalSettingsUpdateSignIn();
}

main().catch(console.error);
