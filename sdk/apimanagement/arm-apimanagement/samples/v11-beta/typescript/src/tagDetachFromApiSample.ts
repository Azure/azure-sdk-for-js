// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to detach the tag from the Api.
 *
 * @summary detach the tag from the Api.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiTag.json
 */
async function apiManagementDeleteApiTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.tag.detachFromApi(
    "rg1",
    "apimService1",
    "59d5b28d1f7fab116c282650",
    "59d5b28e1f7fab116402044e",
  );
}

async function main(): Promise<void> {
  await apiManagementDeleteApiTag();
}

main().catch(console.error);
