// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the details of the user specified by its identifier.
 *
 * @summary updates the details of the user specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateUser.json
 */
async function apiManagementUpdateUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.user.update("rg1", "apimService1", "5931a75ae4bbd512a88c680b", "*", {
    email: "foobar@outlook.com",
    firstName: "foo",
    lastName: "bar",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateUser();
}

main().catch(console.error);
