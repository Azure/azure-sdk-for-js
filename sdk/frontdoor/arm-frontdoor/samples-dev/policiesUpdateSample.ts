// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Patch a specific frontdoor webApplicationFirewall policy for tags update under the specified subscription and resource group.
 *
 * @summary Patch a specific frontdoor webApplicationFirewall policy for tags update under the specified subscription and resource group.
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2024-02-01/examples/WafPolicyPatch.json
 */

import type { TagsObject } from "@azure/arm-frontdoor";
import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchesSpecificPolicy(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "rg1";
  const policyName = "Policy1";
  const parameters: TagsObject = { tags: { key1: "value1", key2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.policies.beginUpdateAndWait(
    resourceGroupName,
    policyName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchesSpecificPolicy();
}

main().catch(console.error);
