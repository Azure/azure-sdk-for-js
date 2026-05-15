// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available Network Rest API operations.
 *
 * @summary lists all of the available Network Rest API operations.
 * x-ms-original-file: 2025-05-01/OperationList.json
 */
async function getAListOfOperationsForAResourceProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfOperationsForAResourceProvider();
}

main().catch(console.error);
