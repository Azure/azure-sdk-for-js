// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a distributed availability group info.
 *
 * @summary Gets a distributed availability group info.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-08-01-preview/examples/DistributedAvailabilityGroupsGet.json
 */
async function getsTheDistributedAvailabilityGroupInfo(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
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
