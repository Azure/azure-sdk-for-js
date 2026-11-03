// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to detach an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities.
 *
 * @summary detach an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities.
 * x-ms-original-file: 2025-06-01/DetachTrafficFilters_Update.json
 */
async function detachTrafficFilterUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.detachTrafficFilter.update("myResourceGroup", "myMonitor", {
    rulesetId: "31d91b5afb6f4c2eaaf104c97b1991dd",
  });
}

async function main(): Promise<void> {
  await detachTrafficFilterUpdate();
}

main().catch(console.error);
