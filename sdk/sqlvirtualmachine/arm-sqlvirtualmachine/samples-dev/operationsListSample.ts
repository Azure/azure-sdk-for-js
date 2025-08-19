// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available SQL Virtual Machine Rest API operations.
 *
 * @summary Lists all of the available SQL Virtual Machine Rest API operations.
 * x-ms-original-file: specification/sqlvirtualmachine/resource-manager/Microsoft.SqlVirtualMachine/preview/2022-08-01-preview/examples/ListOperation.json
 */

import { SqlVirtualMachineManagementClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsAllOfTheAvailableSqlVirtualMachineRestApiOperations(): Promise<void> {
  const subscriptionId =
    process.env["SQLVIRTUALMACHINE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new SqlVirtualMachineManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOfTheAvailableSqlVirtualMachineRestApiOperations();
}

main().catch(console.error);
