// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of Identity Provider configured in the specified service instance.
 *
 * @summary lists a collection of Identity Provider configured in the specified service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListIdentityProviders.json
 */
async function apiManagementListIdentityProviders(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.identityProvider.listByService("rg1", "apimService1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListIdentityProviders();
}

main().catch(console.error);
