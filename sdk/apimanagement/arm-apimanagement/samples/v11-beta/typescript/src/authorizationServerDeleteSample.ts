// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specific authorization server instance.
 *
 * @summary deletes specific authorization server instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteAuthorizationServer.json
 */
async function apiManagementDeleteAuthorizationServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.authorizationServer.delete("rg1", "apimService1", "newauthServer2", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteAuthorizationServer();
}

main().catch(console.error);
