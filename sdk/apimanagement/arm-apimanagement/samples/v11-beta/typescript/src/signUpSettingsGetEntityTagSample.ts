// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the SignUpSettings.
 *
 * @summary gets the entity state (Etag) version of the SignUpSettings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadSignUpSettings.json
 */
async function apiManagementHeadSignUpSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.signUpSettings.getEntityTag("rg1", "apimService1");
}

async function main(): Promise<void> {
  await apiManagementHeadSignUpSettings();
}

main().catch(console.error);
