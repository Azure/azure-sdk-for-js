// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns operation results for long running operations executing DELETE or PATCH on the resource.
 *
 * @summary returns operation results for long running operations executing DELETE or PATCH on the resource.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetOperationResult.json
 */
async function apiManagementGetOperationResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.operationsResults.get("westus2", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
}

async function main(): Promise<void> {
  await apiManagementGetOperationResult();
}

main().catch(console.error);
