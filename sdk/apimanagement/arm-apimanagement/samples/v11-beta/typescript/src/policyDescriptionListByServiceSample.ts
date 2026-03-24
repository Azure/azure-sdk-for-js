// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all policy descriptions.
 *
 * @summary lists all policy descriptions.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListPolicyDescriptions.json
 */
async function apiManagementListPolicyDescriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyDescription.listByService("rg1", "apimService1", {
    scope: "Api",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementListPolicyDescriptions();
}

main().catch(console.error);
