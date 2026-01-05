// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the status of a long running azure asynchronous operation.
 *
 * @summary Get the status of a long running azure asynchronous operation.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/OperationStatusesGet.json
 */
async function getSpecificOperationStatus(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const location = "West US";
  const asyncOperationId = "713192d7-503f-477a-9cfe-4efc3ee2bd11";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.operationStatuses.get(location, asyncOperationId);
  console.log(result);
}

async function main(): Promise<void> {
  await getSpecificOperationStatus();
}

main().catch(console.error);
