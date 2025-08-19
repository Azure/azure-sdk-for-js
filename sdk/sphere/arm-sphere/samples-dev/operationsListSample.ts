// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List the operations for the provider
 *
 * @summary List the operations for the provider
 * x-ms-original-file: specification/sphere/resource-manager/Microsoft.AzureSphere/stable/2024-04-01/examples/GetOperations.json
 */

import { AzureSphereManagementClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operationsList(): Promise<void> {
  const subscriptionId =
    process.env["SPHERE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AzureSphereManagementClient(credential, subscriptionId);
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
