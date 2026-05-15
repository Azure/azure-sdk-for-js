// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a nat rule.
 *
 * @summary deletes a nat rule.
 * x-ms-original-file: 2025-05-01/NatRuleDelete.json
 */
async function natRuleDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.natRules.delete("rg1", "gateway1", "natRule1");
}

async function main(): Promise<void> {
  await natRuleDelete();
}

main().catch(console.error);
