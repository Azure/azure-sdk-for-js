// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available Automanage REST API operations.
 *
 * @summary Lists all of the available Automanage REST API operations.
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/listOperations.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsAllOfTheAvailableAutomanageRestApiOperations(): Promise<void> {
  const subscriptionId =
    process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOfTheAvailableAutomanageRestApiOperations();
}

main().catch(console.error);
