// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementPriceEstimationManagementClient } from "@azure/arm-costmanagementpriceestimation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2026-10-01-preview/OperationsList.json
 */
async function listPriceEstimationProviderOperationMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CostManagementPriceEstimationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPriceEstimationProviderOperationMetadata();
}

main().catch(console.error);
