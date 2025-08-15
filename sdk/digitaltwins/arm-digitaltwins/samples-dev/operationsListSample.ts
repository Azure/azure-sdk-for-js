// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all of the available DigitalTwins service REST API operations.
 *
 * @summary Lists all of the available DigitalTwins service REST API operations.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsOperationsList_example.json
 */
async function getAvailableOperations(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAvailableOperations();
}

main().catch(console.error);
