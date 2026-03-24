// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves a redirection URL containing an authentication token for signing a given user into the developer portal.
 *
 * @summary retrieves a redirection URL containing an authentication token for signing a given user into the developer portal.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUserGenerateSsoUrl.json
 */
async function apiManagementUserGenerateSsoUrl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.user.generateSsoUrl(
    "rg1",
    "apimService1",
    "57127d485157a511ace86ae7",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUserGenerateSsoUrl();
}

main().catch(console.error);
