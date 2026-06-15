// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all operations available Azure Security Insights Resource Provider.
 *
 * @summary lists all operations available Azure Security Insights Resource Provider.
 * x-ms-original-file: 2025-07-01-preview/operations/ListOperations.json
 */
async function getAllOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllOperations();
}

main().catch(console.error);
