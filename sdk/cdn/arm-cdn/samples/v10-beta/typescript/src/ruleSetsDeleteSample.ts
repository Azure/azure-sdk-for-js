// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing AzureFrontDoor rule set with the specified rule set name under the specified subscription, resource group and profile.
 *
 * @summary deletes an existing AzureFrontDoor rule set with the specified rule set name under the specified subscription, resource group and profile.
 * x-ms-original-file: 2025-12-01/RuleSets_Delete.json
 */
async function ruleSetsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.ruleSets.delete("RG", "profile1", "ruleSet1");
}

async function main(): Promise<void> {
  await ruleSetsDelete();
}

main().catch(console.error);
