// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns list of all operations.
 *
 * @summary Returns list of all operations.
 * x-ms-original-file: specification/connectedvmware/resource-manager/Microsoft.ConnectedVMwarevSphere/stable/2023-10-01/examples/ListOperations.json
 */

import { AzureArcVMwareManagementServiceAPI } from "@azure/arm-connectedvmware";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listOperations(): Promise<void> {
  const subscriptionId =
    process.env["CONNECTEDVMWARE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AzureArcVMwareManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listOperations();
}

main().catch(console.error);
