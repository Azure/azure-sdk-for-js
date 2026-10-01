// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineManagementClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available SQL Virtual Machine Rest API operations.
 *
 * @summary lists all of the available SQL Virtual Machine Rest API operations.
 * x-ms-original-file: 2023-10-01/ListOperation.json
 */
async function listsAllOfTheAvailableSQLVirtualMachineRestAPIOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SqlVirtualMachineManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOfTheAvailableSQLVirtualMachineRestAPIOperations();
}

main().catch(console.error);
