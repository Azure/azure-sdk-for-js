// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the client secret details of the OpenID Connect Provider.
 *
 * @summary gets the client secret details of the OpenID Connect Provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementOpenidConnectProviderListSecrets.json
 */
async function apiManagementOpenidConnectProviderListSecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.openIdConnectProvider.listSecrets(
    "rg1",
    "apimService1",
    "templateOpenIdConnect2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementOpenidConnectProviderListSecrets();
}

main().catch(console.error);
