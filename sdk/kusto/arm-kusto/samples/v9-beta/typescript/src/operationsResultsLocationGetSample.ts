// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns operation results.
 *
 * @summary returns operation results.
 * x-ms-original-file: 2025-02-14/KustoOperationResultsOperationResultResponseTypeGet.json
 */
async function kustoOperationsResultsLocationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.operationsResultsLocation.get("westus", "30972f1b-b61d-4fd8-bd34-3dcfa24670f3");
}

async function main(): Promise<void> {
  await kustoOperationsResultsLocationGet();
}

main().catch(console.error);
