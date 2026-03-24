// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates policy configuration for the API Operation level.
 *
 * @summary creates or updates policy configuration for the API Operation level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiOperationPolicy.json
 */
async function apiManagementCreateApiOperationPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiOperationPolicy.createOrUpdate(
    "rg1",
    "apimService1",
    "5600b57e7e8880006a040001",
    "5600b57e7e8880006a080001",
    "policy",
    {
      format: "xml",
      value:
        "<policies> <inbound /> <backend>    <forward-request />  </backend>  <outbound /></policies>",
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiOperationPolicy();
}

main().catch(console.error);
