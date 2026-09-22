// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete cost allocation rule for billing account or enterprise enrollment.
 *
 * @summary delete cost allocation rule for billing account or enterprise enrollment.
 * x-ms-original-file: 2025-03-01/CostAllocationRuleDelete.json
 */
async function deleteCostAllocationRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.costAllocationRules.delete("100", "testRule");
}

async function main(): Promise<void> {
  await deleteCostAllocationRule();
}

main().catch(console.error);
