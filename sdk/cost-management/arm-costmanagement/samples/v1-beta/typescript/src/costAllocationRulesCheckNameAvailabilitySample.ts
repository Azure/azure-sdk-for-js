// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks availability and correctness of a name for a cost allocation rule
 *
 * @summary checks availability and correctness of a name for a cost allocation rule
 * x-ms-original-file: 2025-03-01/CostAllocationRuleCheckNameAvailability.json
 */
async function costAllocationRuleCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.costAllocationRules.checkNameAvailability("100", {
    name: "testRule",
    type: "Microsoft.CostManagement/costAllocationRules",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await costAllocationRuleCheckNameAvailability();
}

main().catch(console.error);
