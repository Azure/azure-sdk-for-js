// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the list of available operations.
 *
 * @summary Returns the list of available operations.
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/Operations/List.json
 */

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

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
