// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch a specific frontdoor webApplicationFirewall policy for tags update under the specified subscription and resource group.
 *
 * @summary patch a specific frontdoor webApplicationFirewall policy for tags update under the specified subscription and resource group.
 * x-ms-original-file: 2025-10-01/WafPolicyPatch.json
 */
async function patchesSpecificPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.policies.update("rg1", "Policy1", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchesSpecificPolicy();
}

main().catch(console.error);
