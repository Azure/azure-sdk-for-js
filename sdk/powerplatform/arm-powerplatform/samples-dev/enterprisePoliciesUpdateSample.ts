// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerPlatformClient } from "@azure/arm-powerplatform";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an EnterprisePolicy
 *
 * @summary updates an EnterprisePolicy
 * x-ms-original-file: 2020-10-30-preview/updateEnterprisePolicy.json
 */
async function updateEnterprisePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const result = await client.enterprisePolicies.update("enterprisePolicy", "resourceGroup", {
    identity: { type: "SystemAssigned" },
    location: "East US",
    tags: { Organization: "Administration" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateEnterprisePolicy();
}

main().catch(console.error);
