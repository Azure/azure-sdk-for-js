// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns list of access infos - for Git and Management endpoints.
 *
 * @summary returns list of access infos - for Git and Management endpoints.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListTenantAccess.json
 */
async function apiManagementListTenantAccess(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tenantAccess.listByService("rg1", "apimService1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListTenantAccess();
}

main().catch(console.error);
