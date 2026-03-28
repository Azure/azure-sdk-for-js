// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates the IdentityProvider configuration.
 *
 * @summary creates or Updates the IdentityProvider configuration.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateIdentityProvider.json
 */
async function apiManagementCreateIdentityProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.identityProvider.createOrUpdate("rg1", "apimService1", "facebook", {
    clientId: "facebookid",
    clientSecret: "facebookapplicationsecret",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateIdentityProvider();
}

main().catch(console.error);
