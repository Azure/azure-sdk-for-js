// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns operation results.
 *
 * @summary returns operation results.
 * x-ms-original-file: 2025-02-14/KustoOperationResultsGet.json
 */
async function kustoOperationResultsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.operationsResults.get(
    "westus",
    "30972f1b-b61d-4fd8-bd34-3dcfa24670f3",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoOperationResultsGet();
}

main().catch(console.error);
