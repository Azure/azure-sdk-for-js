// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of authorization servers defined within a service instance.
 *
 * @summary lists a collection of authorization servers defined within a service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListAuthorizationServers.json
 */
async function apiManagementListAuthorizationServers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authorizationServer.listByService("rg1", "apimService1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListAuthorizationServers();
}

main().catch(console.error);
