// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates secondary key of existing subscription of the API Management service instance.
 *
 * @summary regenerates secondary key of existing subscription of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementSubscriptionRegenerateSecondaryKey.json
 */
async function apiManagementSubscriptionRegenerateSecondaryKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.subscription.regenerateSecondaryKey("rg1", "apimService1", "testsub");
}

async function main(): Promise<void> {
  await apiManagementSubscriptionRegenerateSecondaryKey();
}

main().catch(console.error);
