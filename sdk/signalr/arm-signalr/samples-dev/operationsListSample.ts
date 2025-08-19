// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available REST API operations of the Microsoft.SignalRService provider.
 *
 * @summary Lists all of the available REST API operations of the Microsoft.SignalRService provider.
 * x-ms-original-file: specification/signalr/resource-manager/Microsoft.SignalRService/preview/2023-08-01-preview/examples/Operations_List.json
 */

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operationsList(): Promise<void> {
  const subscriptionId =
    process.env["SIGNALR_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new SignalRManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsList();
}

main().catch(console.error);
