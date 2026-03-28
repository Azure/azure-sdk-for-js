// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the details of a subscription specified by its identifier.
 *
 * @summary updates the details of a subscription specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateSubscription.json
 */
async function apiManagementUpdateSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.subscription.update("rg1", "apimService1", "testsub", "*", {
    displayName: "testsub",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateSubscription();
}

main().catch(console.error);
