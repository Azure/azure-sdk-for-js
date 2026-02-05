// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all of the available RP operations.
 *
 * @summary Lists all of the available RP operations.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/Operations_List.json
 */
async function listAllOperations(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllOperations();
}

main().catch(console.error);
