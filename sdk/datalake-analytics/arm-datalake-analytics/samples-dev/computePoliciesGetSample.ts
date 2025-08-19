// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified Data Lake Analytics compute policy.
 *
 * @summary Gets the specified Data Lake Analytics compute policy.
 * x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/ComputePolicies_Get.json
 */

import { DataLakeAnalyticsAccountManagementClient } from "@azure/arm-datalake-analytics";
import { DefaultAzureCredential } from "@azure/identity";

async function getsTheSpecifiedComputePolicy(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "contosorg";
  const accountName = "contosoadla";
  const computePolicyName = "test_policy";
  const credential = new DefaultAzureCredential();
  const client = new DataLakeAnalyticsAccountManagementClient(credential, subscriptionId);
  const result = await client.computePolicies.get(
    resourceGroupName,
    accountName,
    computePolicyName,
  );
  console.log(result);
}

getsTheSpecifiedComputePolicy().catch(console.error);
