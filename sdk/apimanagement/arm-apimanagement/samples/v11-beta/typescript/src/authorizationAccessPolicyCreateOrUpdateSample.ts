// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates Authorization Access Policy.
 *
 * @summary creates or updates Authorization Access Policy.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateAuthorizationAccessPolicy.json
 */
async function apiManagementCreateAuthorizationAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationAccessPolicy.createOrUpdate(
    "rg1",
    "apimService1",
    "aadwithauthcode",
    "authz1",
    "fe0bed83-631f-4149-bd0b-0464b1bc7cab",
    {
      appIds: ["d5f04bb0-ba78-4878-a43e-35a0b74fe315"],
      objectId: "fe0bed83-631f-4149-bd0b-0464b1bc7cab",
      tenantId: "13932a0d-5c63-4d37-901d-1df9c97722ff",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateAuthorizationAccessPolicy();
}

main().catch(console.error);
