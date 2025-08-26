// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the status of the specified operation. This link is provided in the GenerateDetailedCostReport creation request response header.
 *
 * @summary Get the status of the specified operation. This link is provided in the GenerateDetailedCostReport creation request response header.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateDetailedCostReportOperationStatusBySubscriptionScope.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDetailsOfTheOperationStatus(): Promise<void> {
  const operationId = "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReportOperationStatus.get(operationId, scope);
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfTheOperationStatus();
}

main().catch(console.error);
