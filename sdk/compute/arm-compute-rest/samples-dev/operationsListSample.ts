// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of compute operations.
 *
 * @summary Gets a list of compute operations.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/computeRPCommonExamples/Operations_List_MaximumSet_Gen.json
 */

import type { OperationsListParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { paginate } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operationsListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const options: OperationsListParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client.path("/providers/Microsoft.Compute/operations").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

operationsListMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of compute operations.
 *
 * @summary Gets a list of compute operations.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/computeRPCommonExamples/Operations_List_MinimumSet_Gen.json
 */
async function operationsListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const options: OperationsListParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client.path("/providers/Microsoft.Compute/operations").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

operationsListMinimumSetGen().catch(console.error);
