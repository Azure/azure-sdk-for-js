// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Sign Up Settings for the Portal
 *
 * @summary get Sign Up Settings for the Portal
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPortalSettingsGetSignUp.json
 */
async function apiManagementPortalSettingsGetSignUp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.signUpSettings.get("rg1", "apimService1");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementPortalSettingsGetSignUp();
}

main().catch(console.error);
