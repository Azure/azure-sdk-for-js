// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sends confirmation
 *
 * @summary sends confirmation
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUserConfirmationPasswordSend.json
 */
async function apiManagementUserConfirmationPasswordSend(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.userConfirmationPassword.send("rg1", "apimService1", "57127d485157a511ace86ae7");
}

async function main(): Promise<void> {
  await apiManagementUserConfirmationPasswordSend();
}

main().catch(console.error);
