// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all diagnostics of an API.
 *
 * @summary lists all diagnostics of an API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiDiagnostics.json
 */
async function apiManagementListApiDiagnostics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiDiagnostic.listByService("rg1", "apimService1", "echo-api")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListApiDiagnostics();
}

main().catch(console.error);
