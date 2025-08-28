// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns list of operations.
 *
 * @summary Returns list of operations.
 * x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/operations.json
 */

import { AzureQuantumManagementClient } from "@azure/arm-quantum";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operations(): Promise<void> {
  const subscriptionId =
    process.env["QUANTUM_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuantumManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await operations();
}

main().catch(console.error);
