// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specific named value.
 *
 * @summary updates the specific named value.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateNamedValue.json
 */
async function apiManagementUpdateNamedValue(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.namedValue.update("rg1", "apimService1", "testprop2", "*", {
    displayName: "prop3name",
    secret: false,
    tags: ["foo", "bar2"],
    value: "propValue",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateNamedValue();
}

main().catch(console.error);
