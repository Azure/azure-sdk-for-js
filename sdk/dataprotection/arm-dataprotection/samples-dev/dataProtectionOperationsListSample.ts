// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns the list of available operations.
 *
 * @summary Returns the list of available operations.
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2024-04-01/examples/Operations/List.json
 */
async function returnsTheListOfSupportedRestOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential);
  const resArray = new Array();
  for await (const item of client.dataProtectionOperations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await returnsTheListOfSupportedRestOperations();
}

main().catch(console.error);
