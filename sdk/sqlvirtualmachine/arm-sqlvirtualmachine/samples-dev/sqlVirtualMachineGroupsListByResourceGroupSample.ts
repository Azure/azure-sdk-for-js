// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all SQL virtual machine groups in a resource group.
 *
 * @summary Gets all SQL virtual machine groups in a resource group.
 * x-ms-original-file: specification/sqlvirtualmachine/resource-manager/Microsoft.SqlVirtualMachine/preview/2022-08-01-preview/examples/ListByResourceGroupSqlVirtualMachineGroup.json
 */

import { SqlVirtualMachineManagementClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsAllSqlVirtualMachineGroupsInAResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["SQLVIRTUALMACHINE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQLVIRTUALMACHINE_RESOURCE_GROUP"] || "testrg";
  const credential = new DefaultAzureCredential();
  const client = new SqlVirtualMachineManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlVirtualMachineGroups.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAllSqlVirtualMachineGroupsInAResourceGroup();
}

main().catch(console.error);
