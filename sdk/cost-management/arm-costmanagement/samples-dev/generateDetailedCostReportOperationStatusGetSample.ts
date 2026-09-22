// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of the specified operation. This link is provided in the GenerateDetailedCostReport creation request response header.
 *
 * @summary get the status of the specified operation. This link is provided in the GenerateDetailedCostReport creation request response header.
 * x-ms-original-file: 2025-03-01/GenerateDetailedCostReportOperationStatusBySubscriptionScope.json
 */
async function getDetailsOfTheOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReportOperationStatus.get(
    "00000000-0000-0000-0000-000000000000",
    "subscriptions/00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfTheOperationStatus();
}

main().catch(console.error);
