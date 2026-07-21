// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the operation result for a long running operation.
 *
 * @summary get the operation result for a long running operation.
 * x-ms-original-file: 2025-04-01-preview/OperationResultsGet.json
 */
async function getOperationResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.operationResults.get("westus", "exampleid");
  console.log(result);
}

async function main(): Promise<void> {
  await getOperationResult();
}

main().catch(console.error);
