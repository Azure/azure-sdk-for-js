// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureTerraformClient } from "@azure/arm-terraform";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2023-07-01-preview/ListOperations.json
 */
async function getAListOfOperationsForAResourceProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureTerraformClient(credential, subscriptionId);
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
