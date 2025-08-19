// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns list of operations.
 *
 * @summary Returns list of operations.
 * x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Operations_List.json
 */

import { GraphServices } from "@azure/arm-graphservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getListOfOperations(): Promise<void> {
  const subscriptionId =
    process.env["GRAPHSERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new GraphServices(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getListOfOperations();
}

main().catch(console.error);
