// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve protection policy with specified name within a resource group.
 *
 * @summary retrieve protection policy with specified name within a resource group.
 * x-ms-original-file: 2025-11-01/WafPolicyGet.json
 */
async function getPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.policies.get("rg1", "Policy1");
  console.log(result);
}

async function main(): Promise<void> {
  await getPolicy();
}

main().catch(console.error);
