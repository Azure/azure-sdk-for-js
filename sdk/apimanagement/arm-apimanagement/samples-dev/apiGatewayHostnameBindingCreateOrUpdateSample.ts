// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an API Management gateway hostname binding. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management gateway hostname binding. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGatewayHostnameBinding.json
 */
async function apiManagementCreateGatewayHostnameBinding(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGatewayHostnameBinding.createOrUpdate(
    "rg1",
    "apimGateway1",
    "hb-1",
    {
      hostname: "primary.cotoso.com",
      keyVault: {
        identityClientId: "00000000-0000-0000-0000-000000000000",
        secretId: "https://myvault.keyvault.azure.net/secrets/contosoprimarycert",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateGatewayHostnameBinding();
}

main().catch(console.error);
