// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  UpdateComputePolicyParameters,
  ComputePoliciesUpdateOptionalParams,
} from "@azure/arm-datalake-analytics";
import { DataLakeAnalyticsAccountManagementClient } from "@azure/arm-datalake-analytics";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Updates the specified compute policy.
 *
 * @summary Updates the specified compute policy.
 * x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/ComputePolicies_Update.json
 */
async function updatesTheSpecifiedComputePolicy(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "contosorg";
  const accountName = "contosoadla";
  const computePolicyName = "test_policy";
  const parameters: UpdateComputePolicyParameters = {
    maxDegreeOfParallelismPerJob: 11,
    minPriorityPerJob: 31,
  };
  const options: ComputePoliciesUpdateOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new DataLakeAnalyticsAccountManagementClient(credential, subscriptionId);
  const result = await client.computePolicies.update(
    resourceGroupName,
    accountName,
    computePolicyName,
    options,
  );
  console.log(result);
}

updatesTheSpecifiedComputePolicy().catch(console.error);
