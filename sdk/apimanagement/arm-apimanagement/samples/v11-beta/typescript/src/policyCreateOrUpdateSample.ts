// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the global policy configuration of the Api Management service.
 *
 * @summary creates or updates the global policy configuration of the Api Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreatePolicy.json
 */
async function apiManagementCreatePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policy.createOrUpdate("rg1", "apimService1", "policy", {
    format: "xml",
    value:
      "<policies>\r\n  <inbound />\r\n  <backend>\r\n    <forward-request />\r\n  </backend>\r\n  <outbound />\r\n</policies>",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreatePolicy();
}

main().catch(console.error);
