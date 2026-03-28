// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes the specified developer portal's content type. Content types describe content items' properties, validation rules, and constraints. Built-in content types (with identifiers starting with the `c-` prefix) can't be removed.
 *
 * @summary removes the specified developer portal's content type. Content types describe content items' properties, validation rules, and constraints. Built-in content types (with identifiers starting with the `c-` prefix) can't be removed.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteContentType.json
 */
async function apiManagementDeleteContentType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.contentType.delete("rg1", "apimService1", "page", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteContentType();
}

main().catch(console.error);
