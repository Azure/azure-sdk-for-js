// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a distributed availability group info.
 *
 * @summary Gets a distributed availability group info.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/DistributedAvailabilityGroupsGet.json
 */

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsTheDistributedAvailabilityGroupInfo(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "f2669dff-5f08-45dd-b857-b2a60b72cdc9";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "testcl";
  const distributedAvailabilityGroupName = "dag";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.distributedAvailabilityGroups.get(
    resourceGroupName,
    managedInstanceName,
    distributedAvailabilityGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheDistributedAvailabilityGroupInfo();
}

main().catch(console.error);
