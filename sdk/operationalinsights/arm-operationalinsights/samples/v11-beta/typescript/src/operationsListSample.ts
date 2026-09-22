// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available OperationalInsights Rest API operations.
 *
 * @summary lists all of the available OperationalInsights Rest API operations.
 * x-ms-original-file: 2025-07-01/OperationsListByTenant.json
 */
async function getSpecificOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getSpecificOperationStatus();
}

main().catch(console.error);
