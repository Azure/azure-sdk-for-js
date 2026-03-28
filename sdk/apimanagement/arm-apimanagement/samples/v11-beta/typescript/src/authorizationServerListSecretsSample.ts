// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the client secret details of the authorization server.
 *
 * @summary gets the client secret details of the authorization server.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementAuthorizationServerListSecrets.json
 */
async function apiManagementAuthorizationServerListSecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationServer.listSecrets(
    "rg1",
    "apimService1",
    "newauthServer2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementAuthorizationServerListSecrets();
}

main().catch(console.error);
