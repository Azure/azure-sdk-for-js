// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerPlatformClient } from "@azure/arm-powerplatform";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an EnterprisePolicy
 *
 * @summary delete an EnterprisePolicy
 * x-ms-original-file: 2020-10-30-preview/deleteEnterprisePolicy.json
 */
async function deleteAnEnterprisePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  await client.enterprisePolicies.delete("resourceGroup", "enterprisePolicy");
}

async function main(): Promise<void> {
  await deleteAnEnterprisePolicy();
}

main().catch(console.error);
