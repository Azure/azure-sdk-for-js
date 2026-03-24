// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the SignInSettings.
 *
 * @summary gets the entity state (Etag) version of the SignInSettings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadSignInSettings.json
 */
async function apiManagementHeadSignInSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.signInSettings.getEntityTag("rg1", "apimService1");
}

async function main(): Promise<void> {
  await apiManagementHeadSignInSettings();
}

main().catch(console.error);
