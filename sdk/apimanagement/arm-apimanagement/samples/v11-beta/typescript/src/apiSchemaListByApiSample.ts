// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the schema configuration at the API level.
 *
 * @summary get the schema configuration at the API level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiSchemas.json
 */
async function apiManagementListApiSchemas(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiSchema.listByApi(
    "rg1",
    "apimService1",
    "59d5b28d1f7fab116c282650",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListApiSchemas();
}

main().catch(console.error);
