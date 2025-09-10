// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a management operation on a managed instance.
 *
 * @summary Gets a management operation on a managed instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/GetManagedInstanceOperation.json
 */

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsTheManagedInstanceManagementOperation(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const managedInstanceName = "sqlcrudtest-4645";
  const operationId = "00000000-1111-2222-3333-444444444444";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceOperations.get(
    resourceGroupName,
    managedInstanceName,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheManagedInstanceManagementOperation();
}

main().catch(console.error);
