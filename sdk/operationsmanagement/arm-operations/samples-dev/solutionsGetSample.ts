// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves the user solution.
 *
 * @summary Retrieves the user solution.
 * x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionGet.json
 */

import { OperationsManagementClient } from "@azure/arm-operations";
import { DefaultAzureCredential } from "@azure/identity";

async function solutionGet(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const solutionName = "solution1";
  const credential = new DefaultAzureCredential();
  const client = new OperationsManagementClient(credential, subscriptionId);
  const result = await client.solutions.get(resourceGroupName, solutionName);
  console.log(result);
}

solutionGet().catch(console.error);
