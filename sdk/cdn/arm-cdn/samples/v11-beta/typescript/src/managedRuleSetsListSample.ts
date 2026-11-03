// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all available managed rule sets.
 *
 * @summary lists all available managed rule sets.
 * x-ms-original-file: 2026-09-01-preview/WafListManagedRuleSets.json
 */
async function wafListManagedRuleSets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedRuleSets.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await wafListManagedRuleSets();
}

main().catch(console.error);
