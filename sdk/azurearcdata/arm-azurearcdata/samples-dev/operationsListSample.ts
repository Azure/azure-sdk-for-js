// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available Azure Data Services on Azure Arc API operations.
 *
 * @summary lists all of the available Azure Data Services on Azure Arc API operations.
 * x-ms-original-file: 2026-03-01-preview/ListOperation.json
 */
async function listsAllOfTheAvailableAzureDataServicesOnAzureArcAPIOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureArcDataClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOfTheAvailableAzureDataServicesOnAzureArcAPIOperations();
}

main().catch(console.error);
