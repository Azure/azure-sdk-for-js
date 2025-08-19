// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Failovers a managed instance.
 *
 * @summary Failovers a managed instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/FailoverManagedInstance.json
 */

import type { ManagedInstancesFailoverOptionalParams } from "@azure/arm-sql";
import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function failoverAManagedInstance(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const managedInstanceName = "instanceName";
  const replicaType = "Primary";
  const options: ManagedInstancesFailoverOptionalParams = { replicaType };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstances.beginFailoverAndWait(
    resourceGroupName,
    managedInstanceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await failoverAManagedInstance();
}

main().catch(console.error);
