// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists available operations for the Microsoft.Kusto provider.
 *
 * @summary Lists available operations for the Microsoft.Kusto provider.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoOperationsList.json
 */

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoOperationsList(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await kustoOperationsList();
}

main().catch(console.error);
