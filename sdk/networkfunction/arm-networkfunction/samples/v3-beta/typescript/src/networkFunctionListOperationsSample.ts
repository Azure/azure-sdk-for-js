// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available NetworkFunction Rest API operations.
 *
 * @summary lists all of the available NetworkFunction Rest API operations.
 * x-ms-original-file: 2022-11-01/OperationsList.json
 */
async function operationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureTrafficCollectorClient(credential);
  const resArray = new Array();
  for await (const item of client.networkFunction.listOperations()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsList();
}

main().catch(console.error);
