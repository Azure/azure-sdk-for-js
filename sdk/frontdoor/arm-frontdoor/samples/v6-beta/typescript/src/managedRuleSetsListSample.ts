// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all available managed rule sets.
 *
 * @summary lists all available managed rule sets.
 * x-ms-original-file: 2025-11-01/WafListManagedRuleSets.json
 */
async function listPoliciesManagedRuleSetsInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedRuleSets.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPoliciesManagedRuleSetsInAResourceGroup();
}

main().catch(console.error);
