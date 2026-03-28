// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete tag description for the Api.
 *
 * @summary delete tag description for the Api.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiTagDescription.json
 */
async function apiManagementDeleteApiTagDescription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiTagDescription.delete(
    "rg1",
    "apimService1",
    "59d5b28d1f7fab116c282650",
    "59d5b28e1f7fab116402044e",
    "*",
  );
}

async function main(): Promise<void> {
  await apiManagementDeleteApiTagDescription();
}

main().catch(console.error);
