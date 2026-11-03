// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists available operations for the Microsoft.VirtualMachineImages provider
 *
 * @summary lists available operations for the Microsoft.VirtualMachineImages provider
 * x-ms-original-file: 2025-10-01/OperationsList.json
 */
async function retrieveOperationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ImageBuilderClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await retrieveOperationsList();
}

main().catch(console.error);
