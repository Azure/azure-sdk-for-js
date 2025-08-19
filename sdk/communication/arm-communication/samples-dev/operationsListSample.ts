// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available REST API operations of the Microsoft.Communication provider.
 *
 * @summary Lists all of the available REST API operations of the Microsoft.Communication provider.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/operationsList.json
 */

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operationsList(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
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
