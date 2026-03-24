// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Sign-Up settings.
 *
 * @summary update Sign-Up settings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPortalSettingsUpdateSignUp.json
 */
async function apiManagementPortalSettingsUpdateSignUp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.signUpSettings.update("rg1", "apimService1", "*", {
    enabled: true,
    termsOfService: { consentRequired: true, enabled: true, text: "Terms of service text." },
  });
}

async function main(): Promise<void> {
  await apiManagementPortalSettingsUpdateSignUp();
}

main().catch(console.error);
